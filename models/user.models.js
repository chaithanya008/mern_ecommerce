const mongoose = require("mongoose");
// for hashing
const crypto = require("crypto");
// for password gen?
const uuidv1 = require("uuidv1/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // for removing white spaces in beginning or end
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    emaiaboutl: {
      type: String,
      trim: true,
      requie: 32,
    },
    // long unique string for gen hash password
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtual field

userSchema
  .virtual("password") // password is the virtual property being created here
  // sending password to client
  .set(function (password) {
    // coming from client side, above
    this._password = password; // _password is temp var?
    this.salt = uuidv1(); // gives random string
    this.hashPassword = this.encryptPassword(password); // encryptPassword is a user defined fn
  })
  .get(function () {
    return this._password; // return password value?
  });

userSchema.method = {
  // add methods to userSchema, above
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return (
        crypto
          .createHmac("sha256", this.salt) //hash the password, sha1 method, salt is long unique string. documentation says not to use sha1
          // above, use 2nd var as secret key to create final hash
          .update(password) // ingest streaming data, can be invoked multiple times
          .digest("hex")
      ); // output format
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema); // creating a model
