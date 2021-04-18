const multer = require("multer");
const router = require("express").Router();
const verify = require("../verifyToken");

const upload = multer({
  
  limits: {
    fileSize: 1000000,
  },
  image: {
    type: Buffer,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/upload",
  upload.single("upload"),
  async (req, res) => {
    try {
      const incident = await Incident.findById(req.body.id);
      incident.image = req.file.buffer;
      incident.save();
      res.send(incident);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/:id/image", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident || !incident.image) {
      throw new Error();
    }
    //response header, use set
    res.set("Content-Type", "image/png");
    res.send(incident.image);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
