const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment")
const fs = require('fs');

//img storage confing
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});

// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(null, Error("only image is allowd"))
    }
}
var upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})

//uploadStory
router.post("/storyform/:AdminName", upload.single("photo"), (req, res) => {
    const { fid } = req.body;
    const { filename } = req.file;
    const { fstorytitleeng } = req.body;
    const { fstorytitlethai } = req.body;
    const { fauthor } = req.body;
    const { fintroductionstoryeng } = req.body;
    const { fintroductionstorythai } = req.body;
    const { fpublishername } = req.body;
    const { fdatepublication } = req.body;
    const { AdminName } = req.params;
    if (!filename || !fid || !fstorytitleeng || !fstorytitlethai || !fauthor || !fintroductionstoryeng || !fintroductionstorythai || !fpublishername || !fdatepublication) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }
    try {
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        conn.query("INSERT INTO Story SET ?", { AdminName: AdminName, StoryID: fid, StoryImage: filename, date: date, StoryTitleEng: fstorytitleeng, StoryTitleThai: fstorytitlethai, Author: fauthor, IntroductionStoryEng: fintroductionstoryeng, IntroductionStoryThai: fintroductionstorythai, PublisherName: fpublishername, DatePublication: fdatepublication }, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data added")
                res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

//upload Dressing
router.post("/uploaddressing/:AdminName", upload.single("photo"), (req, res) => {
    const { filename } = req.file;
    const { AdminName } = req.params;
    const { DressingType } = req.body;
    if (!filename || !DressingType) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }
    try {
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        if(DressingType=="Head"){
            conn.query("INSERT INTO Dressing SET ?", { HeadImg: filename, date: date, DressingType: DressingType }, (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("data added")
                    res.status(201).json({ status: 201, data: req.body })
                }
            })
        }else if(DressingType=="Body"){
            conn.query("INSERT INTO Dressing SET ?", { BodyImg: filename, date: date, DressingType: DressingType }, (err, result) => {
                if (err) {
                    console.log("error")
                } else {
                    console.log("data added")
                    res.status(201).json({ status: 201, data: req.body })
                }
            })
        }
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

//Upload Story Detail Alternative
router.use(express.urlencoded({ extended: true }));
const path = require('path');
const gtts = require('node-gtts')('en');
const gttsth = require('node-gtts')('th');
const { v4: uuidv4 } = require('uuid');
router.post("/storydetailalternative", upload.single("photo"), function (req, res) {
    const StoryDetailEng = req.body.StoryDetailEng;
    const PageNo = req.body.PageNo;
    const PageNoAnswer1 = req.body.PageNoAnswer1;
    const PageNoAnswer2 = req.body.PageNoAnswer2;
    const PageNoAnswer1Extra = req.body.PageNoAnswer1Extra;
    const PageNoAnswer2Extra = req.body.PageNoAnswer2Extra;
    const StoryID = req.body.StoryID;
    // const id = uuidv4();
    const StoryDetailThai = req.body.StoryDetailThai;
    const QuestionEng = req.body.QuestionEng;
    const QuestionThai = req.body.QuestionThai;
    const AnswerEng1 = req.body.AnswerEng1;
    const AnswerEng2 = req.body.AnswerEng2;
    const AnswerThai1 = req.body.AnswerThai1;
    const AnswerThai2 = req.body.AnswerThai2;
    const { filename } = req.file;
    gtts.save(`audio/${AnswerEng1}.mp3`, path.join(AnswerEng1),
        function (err, result) {
            if (err) { throw new Error(err); }
            console.log(result);
        });
    gtts.save(`audio/${AnswerEng2}.mp3`, path.join(AnswerEng2),
        function (err, result) {
            if (err) { throw new Error(err); }
            console.log(result);
        });
    gtts.save(`audio/${PageNo}${StoryID}Eng.mp3`, path.join(StoryDetailEng),
        function (err, result) {
            if (err) { throw new Error(err); }
            console.log(result);
        });
    gttsth.save(`audio/${PageNo}${StoryID}TH.mp3`, path.join(StoryDetailThai),
        function (err, result) {
            if (err) { throw new Error(err); }
            console.log(result);
            const AudioEng = `audio/${PageNo}${StoryID}Eng.mp3`;
            const AudioThai = `audio/${PageNo}${StoryID}TH.mp3`;
            const AudioAnswerEng1 = `audio/${AnswerEng1}.mp3`;
            const AudioAnswerEng2 = `audio/${AnswerEng2}.mp3`;
            const sql = `INSERT INTO StoryDetail (StoryDetailEng,StoryDetailThai,StoryID, PageNo, AudioEng,AudioThai,PageType,SceneImage,date,QuestionEng,QuestionThai,AnswerEng1,AnswerEng2,AnswerThai1,AnswerThai2,AudioAnswerEng1,AudioAnswerEng2,PageNoAnswer1,PageNoAnswer2,PageNoAnswer1Extra,PageNoAnswer2Extra) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            conn.query(sql, [StoryDetailEng, StoryDetailThai, StoryID, PageNo, AudioEng, AudioThai, "alternative", filename, date, QuestionEng, QuestionThai, AnswerEng1, AnswerEng2, AnswerThai1, AnswerThai2, AudioAnswerEng1, AudioAnswerEng2,PageNoAnswer1,PageNoAnswer2,PageNoAnswer1Extra,PageNoAnswer2Extra], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            res.send('GTTS output saved successfully.');
        });
});

router.post("/storydetailnormal", upload.single("photo"), function (req, res) {
    const StoryDetailEng = req.body.StoryDetailEng;
    const PageNo = req.body.PageNo;
    const PageNoNext = req.body.PageNoNext;
    const PageNoAnswer1Extra = req.body.PageNoAnswer1Extra;
    const PageNoAnswer2Extra = req.body.PageNoAnswer2Extra;
    const StoryID = req.body.StoryID;
    // const id = uuidv4();
    const StoryDetailThai = req.body.StoryDetailThai;
    const { filename } = req.file;
    gtts.save(`audio/${PageNo}${StoryID}Eng.mp3`, path.join(StoryDetailEng),
        function (err, result) {
            if (err) { throw new Error(err); }
            console.log(result);
        });
    gttsth.save(`audio/${PageNo}${StoryID}TH.mp3`, path.join(StoryDetailThai),
        function (err, result) {
            if (err) { throw new Error(err); }
            console.log(result);
            const AudioEng = `audio/${PageNo}${StoryID}Eng.mp3`;
            const AudioThai = `audio/${PageNo}${StoryID}TH.mp3`;
            const sql = `INSERT INTO StoryDetail (StoryDetailEng,StoryDetailThai,StoryID, PageNo, AudioEng,AudioThai,PageType,SceneImage,date,PageNoNext,PageNoAnswer1Extra,PageNoAnswer2Extra) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
            let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            conn.query(sql, [StoryDetailEng, StoryDetailThai, StoryID, PageNo, AudioEng, AudioThai, "normal", filename, date,PageNoNext,PageNoAnswer1Extra,PageNoAnswer2Extra], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            res.send('GTTS output saved successfully.');
        });
});


// Upload Character
router.post("/characterform", upload.single("photo"), function (req, res) {
    const StoryID = req.body.StoryID;
    const CharacterID = req.body.CharacterID;
    const CharacterName = req.body.CharacterName;
    const { filename } = req.file;
    const sql = `INSERT INTO Characters (StoryID,CharacterID,CharacterName,CharacterImg,date) VALUES (?,?,?,?,?)`;
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    conn.query(sql, [StoryID,CharacterID,CharacterName,filename, date], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.send('saved successfully.');
});

// get data and search
router.get("/getdata", (req, res) => {
    const query = req.query.q;
    try {
        conn.query(`SELECT * FROM Story WHERE StoryTitleEng LIKE '%${query}'`, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

// get single data
router.get("/getdata/:StoryID", (req, res) => {
    const { StoryID } = req.params;
    conn.query("SELECT * FROM Story WHERE StoryID = ? ", StoryID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

// get Character
router.get("/getcharacter/:StoryID", (req, res) => {
    const { StoryID } = req.params;
    conn.query("SELECT * FROM Characters WHERE StoryID = ? ", StoryID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

// get Character Custom
router.get("/charactercustom/:CustomID", (req, res) => {
    const { CustomID } = req.params;
    conn.query("SELECT * FROM Custom WHERE CustomID = ? ORDER BY CustomID DESC LIMIT 1", CustomID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

// Update Story
router.patch('/updatestory/:StoryID', upload.single("photo"), (req, res) => {
    const StoryID = req.params.StoryID;
    const { StoryTitleEng } = req.body;
    const { StoryTitleThai } = req.body;
    const { Author } = req.body;
    const { IntroductionStoryEng } = req.body;
    const { IntroductionStoryThai } = req.body;
    const { PublisherName } = req.body;
    const { DatePublication } = req.body;
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const sql = `UPDATE Story SET StoryTitleEng = '${StoryTitleEng}',StoryTitleThai = '${StoryTitleThai}',date= '${date}',
    Author = '${Author}',IntroductionStoryEng = '${IntroductionStoryEng}',IntroductionStoryThai = '${IntroductionStoryThai}', 
    PublisherName= '${PublisherName}',DatePublication = '${DatePublication}' 
    WHERE StoryID = '${StoryID}'`;
    conn.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(`Updated ${results.affectedRows} rows`);
        }
    });
});

//Delete Story
router.delete("/:StoryID", (req, res) => {
    const { StoryID } = req.params;
    try {
        conn.query(`DELETE FROM Story WHERE StoryID = '${StoryID}'`, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data delete")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

// Regiter Admin
router.post("/registeradmin", upload.single("photo"), (req, res) => {
    const { fadminname } = req.body;
    const { fid } = req.body;
    const { fpassword } = req.body;
    const { ffname } = req.body;
    const { flname } = req.body;
    if (!fid || !fadminname || !fpassword || !ffname || !flname) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }
    try {
        conn.query("SELECT * FROM Admin WHERE AdminName = ?", fadminname, (err, result) => {
            if (result.length) {
                res.status(202).json({ status: 202, data: req.body })
            } else {
                conn.query("INSERT INTO Admin SET ?", { AdminID: fid, AdminName: fadminname, Password: fpassword, FirstName: ffname, LastName: flname }, (err, result) => {
                    if (err) {
                        console.log("error")
                    } else {
                        console.log("data added")
                        res.status(201).json({ status: 201, data: req.body })
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

// Login Admin
router.post("/loginadmin/:AdminName", async (req, res) => {
    const AdminName = req.body.AdminName
    const Password = req.body.Password
    conn.query(
        `SELECT * FROM Admin WHERE  AdminName = ? AND Password = ?`,
        [AdminName, Password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong adminname/password cobination" });
            }
        }
    );
});

// Regiter Member
router.post("/registermember", upload.single("photo"), (req, res) => {
    const { fusername } = req.body;
    const { fpassword } = req.body;
    const { ffname } = req.body;
    const { flname } = req.body;
    const { filename } = req.file;
    if (!filename || !fusername || !fpassword || !ffname || !flname) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }
    try {
        conn.query("SELECT * FROM User WHERE UserName = ?", fusername, (err, result) => {
            if (result.length) {
                res.status(202).json({ status: 202, data: req.body })
            } else {
                let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
                conn.query("INSERT INTO User SET ?", { UserName: fusername, Password: fpassword, FirstName: ffname, LastName: flname, ImageProfile: filename, date: date }, (err, result) => {
                    if (err) {
                        console.log("error")
                    } else {
                        console.log("data added")
                        res.status(201).json({ status: 201, data: req.body })
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

// Login Member
router.post("/loginmember/:UserName", (req, res) => {
    const UserName = req.body.UserName
    const Password = req.body.Password
    conn.query(
        "SELECT * FROM User WHERE UserName = ? AND Password = ?",
        [UserName, Password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password cobination" });
            }
        }
    );
});

//Save Drawing
router.post("/canvas/:UserName/:StoryID", async (req, res) => {
    const { pngData } = req.body;
    const { StoryID } = req.params;
    const { UserName } = req.params;
    const fileName = Date.now() + '.png'; // Generate unique file name
    try {
        // Decode base64 PNG data and write to file
        const filePath = `uploads/${fileName}`;
        const fileData = pngData.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(filePath, fileData, 'base64');
        // Insert file path into MySQL table
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        conn.query("INSERT INTO Custom SET ?", { Drawing: filePath, date: date, UserName: UserName, StoryID: StoryID}, (err, result) => {
            if (err) {
                res.status(500).send('Error saving post');
            } else {
                res.status(200).send('Post saved successfully');
            }
        })
    } catch (error) {
        console.error('Error saving drawing:', error);
        res.status(500).send();
    }
});

//Uploadimg
router.post("/uploadimage/:UserName/:StoryID", upload.single("photo"), (req, res) => {
    const { filename } = req.file;
    const { StoryID } = req.params;
    const { UserName } = req.params;

    if (!filename) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }
    try {
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        conn.query("INSERT INTO Custom SET ?", { UploadImg: filename, StoryID: StoryID, UserName: UserName, date: date}, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data added")
                res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});

//Pose Animator Custom
router.get("/poseanimatorCustom/:StoryID", (req, res) => {
    const { StoryID } = req.params;
    conn.query("SELECT * FROM Custom WHERE StoryID = ? ORDER BY CustomID DESC LIMIT 1", StoryID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

//PoseAnimator Story Title
router.get("/poseanimatorT/:StoryID", (req, res) => {
    const { StoryID } = req.params;
    conn.query("SELECT * FROM Story WHERE StoryID = ? ", StoryID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

//StoryDetail PoseAnimator
router.get("/poseanimatorD/:StoryID", (req, res) => {
    const { StoryID } = req.params;
    conn.query(`SELECT * FROM StoryDetail WHERE PageNo = '1' AND StoryID = '${StoryID}' ORDER BY StoryID DESC LIMIT 1`, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

//StoryDetail PoseAnimatorAnswer1
router.get("/poseanimatorD/:StoryID/:PageNoAnswer1", (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer1 } = req.params;
    conn.query(`SELECT * FROM StoryDetail WHERE PageNo = '${PageNoAnswer1}' AND StoryID = ?`, StoryID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

//StoryDetail PoseAnimatorAnswer2
router.get("/poseanimatorD/:StoryID/:PageNoAnswer2", (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer2 } = req.params;
    conn.query(`SELECT * FROM StoryDetail WHERE PageNo = '${PageNoAnswer2}' AND StoryID = ?`, StoryID, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

//StoryDetail PoseAnimatorNormal
router.get("/poseanimatorD/:StoryID/:PageNoNext/:PageNoAnswer1Extra/:PageNoAnswer2Extra", (req, res) => {
    const { StoryID } = req.params;
    const { PageNoNext } = req.params;
    const { PageNoAnswer1Extra } = req.params;
    const { PageNoAnswer2Extra } = req.params;  
    conn.query(`SELECT * FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoNext}' OR PageNo ='${PageNoAnswer1Extra}' OR PageNo ='${PageNoAnswer2Extra}' `, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

// Audio Story Detail PoseAnimator
router.get('/audioeng/:StoryID', (req, res) => {
    const { StoryID } = req.params;
    conn.query(`SELECT AudioEng FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '1' `,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioEng;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audiothai/:StoryID', (req, res) => {
    const { StoryID } = req.params;
    conn.query(`SELECT AudioThai FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '1'`,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioThai;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

// Audio Story Detail PoseAnimatorNormal
router.get('/audioeng/:StoryID/:PageNoNext', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoNext } = req.params;
    conn.query(`SELECT AudioEng FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoNext}' `, (err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioEng;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audiothai/:StoryID/:PageNoNext', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoNext } = req.params;
    conn.query(`SELECT AudioThai FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoNext}'`,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioThai;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

//Audio Story Detail Pose Animator Next1
router.get('/audioeng/:StoryID/:PageNoAnswer1', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer1 } = req.params;
    conn.query(`SELECT AudioEng FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer1}'`,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioEng;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audiothai/:StoryID/:PageNoAnswer1', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer1 } = req.params;
    conn.query(`SELECT AudioThai FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer1}'`, (err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioThai;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

//Audio Story Detail Pose Animator Next2
router.get('/audioeng/:StoryID/:PageNoAnswer2', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer2 } = req.params;
    conn.query(`SELECT AudioEng FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer2}'`, (err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioEng;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audiothai/:StoryID/:PageNoAnswer2', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer2 } = req.params;
    conn.query(`SELECT AudioThai FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer2}'`, (err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioThai;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

//Audio Answer Pose Animator
router.get('/audioanswereng1/:StoryID/:PageNoNext', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoNext } = req.params;
    conn.query(`SELECT AudioAnswerEng1 FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoNext}'`, (err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioAnswerEng1;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audioanswereng2/:StoryID/:PageNoNext', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoNext } = req.params;
    conn.query(`SELECT AudioAnswerEng2 FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoNext}' `, (err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioAnswerEng2;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

//Audio Answer Pose Animator Next
router.get('/audioanswereng1/:StoryID/:PageNoAnswer1', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer1 } = req.params;
    conn.query(`SELECT AudioAnswerEng1 FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer1}'`,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioAnswerEng1;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audioanswereng2/:StoryID/:PageNoAnswer1', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer1 } = req.params;
    conn.query(`SELECT AudioAnswerEng2 FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer1}' `,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioAnswerEng2;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

//Audio Answer2 Pose Animator Next
router.get('/audioanswereng1/:StoryID/:PageNoAnswer2', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer2 } = req.params;
    conn.query(`SELECT AudioAnswerEng1 FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer2}'`,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioAnswerEng1;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
router.get('/audioanswereng2/:StoryID/:PageNoAnswer2', (req, res) => {
    const { StoryID } = req.params;
    const { PageNoAnswer2 } = req.params;
    conn.query(`SELECT AudioAnswerEng2 FROM StoryDetail WHERE StoryID = '${StoryID}' AND PageNo = '${PageNoAnswer2}'`,(err, result) => {
        if (err) throw err;
        const filePath = result[0].AudioAnswerEng2;
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

// Show Dressing Head
router.get('/GetDressingHead', (req, res) => {
    const sql = `SELECT HeadImg FROM Dressing WHERE DressingType='Head'`;
    conn.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving dressing options');
        } else {
            res.json(results);
        }
    });
});

// Show Dressing Body
router.get('/GetDressingBody', (req, res) => {
    const sql = `SELECT BodyImg FROM Dressing WHERE DressingType='Body'`;
    conn.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving dressing options');
        } else {
            res.json(results);
        }
    });
});

// Save Dressing
router.post('/SaveDressing/:UserName/:StoryID', (req, res) => {
    const { HeadImg } = req.body[0];
    const { BodyImg } = req.body[1];
    const {UserName}=req.params;
    const {StoryID}=req.params;
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const query = `INSERT INTO Custom (DressingHead,DressingBody,date,UserName,StoryID) VALUES (?,?,?,?,?)`;
    conn.query(query, [HeadImg, BodyImg, date,UserName,StoryID], (err, results) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;