!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t){e.exports=require("mongoose")},function(e,t,r){const s=r(0);r(2).config();const n=process.env.ATLAS_URI;console.log("uri",n),s.connect(n,{useNewUrlParser:!0}),t.connection=s.connection},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("express")},function(e,t,r){const s=r(0),n=new(0,s.Schema)({firstname:{type:String,required:!0},lastname:{type:String,required:!0},email:{type:String,required:!0,unique:!0,trim:!0,minlength:3},paymentDetails:{type:String},role:{type:String,enum:["user","admin"],required:!0},address:{type:String},city:{type:String},state:{type:String},zipCode:{type:Number},country:{type:String},mobileNumber:{type:Number},isVerified:{type:Boolean,required:!0}},{timestamps:!0}),a=s.models.User||s.model("User",n);e.exports=a},function(e,t,r){const s=r(15),n=r(4);e.exports=async(e,t,r)=>{if(!e.headers.authorization)return t.status(401).json({message:"Unauthorized Access"});{const a=e.headers.authorization.split(" ")[1];try{const i=await s.auth().verifyIdToken(a);if(i){const t=await n.find({email:i.email});return e.user=t[0],r()}return t.status(401).json({message:"Authorization required"})}catch(e){t.status(400).json(e)}}}},function(e,t,r){const s=r(0),n=new(0,s.Schema)({carCompany:{type:String},photos:{type:Array,required:!0},modelName:{type:String},modelYear:{type:String},description:{type:String},color:{type:String},kilometersDriven:{type:Number},condition:{type:String},basePrice:{type:Number},fullPrice:{type:Number},ownerId:{type:s.Schema.Types.ObjectId,refPath:"User",required:!0},currentBid:{type:Number,default:0},numberOfBids:{type:Number,default:0},endTime:{type:Date},bidTimelineId:{type:Number},ownerId:{type:s.Schema.Types.ObjectId,refPath:"User"},status:{type:String,enum:["pending for approval","approved","rejected","sold"],required:!0},lock:{type:Boolean,default:!1}},{timestamps:!0}),a=s.models.Car||s.model("Car",n);e.exports=a},function(e,t,r){const s=r(3),n=r(8),{connection:a}=(r(0),r(1)),i=r(9);r(2).config();const o=s();process.env.PORT;o.use(n()),o.use(s.json()),a.once("open",()=>{console.log("MongoDB database connection established successfully")});const d=r(10),c=r(21),u=r(23);o.use("/.netlify/functions/server/cars",d),o.use("/.netlify/functions/server/users",c),o.use("/.netlify/functions/server/cards",u),e.exports=o,e.exports.handler=i(o)},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("serverless-http")},function(e,t,r){const s=r(3).Router(),{listCar:n,updateCar:a,deleteCar:i,getById:o,getAllListings:d,verifyCar:c,rejectCar:u,placeBid:l,placeBidCheck:m,getHistory:p,getMyListings:y,getMyBids:b}=r(11);r(6);const f=r(5),g=r(18);s.get("/",d),s.post("/add",f,g.array("image"),n),s.get("/:id",o),s.get("/mylistings/:email",f,y),s.get("/mybids/:email",f,b),s.get("/:id/history",p),s.delete("/:id",i),s.post("/update/:id",f,a),s.post("/verify/:id",f,c),s.post("/reject/:id",f,u),s.post("/placebid",f,l),s.post("/placebidcheck",f,m),e.exports=s},function(e,t,r){const s=r(6),n=r(12),a=r(4),i=r(13),{connection:o}=r(1);t.listCar=async(e,t)=>{try{const r=e.files;result=[],r.forEach(async e=>{let t=i.uploader.upload(e.path);result.push(t)}),Promise.all(result).then(r=>{resultantUrls=[],r.forEach(e=>{resultantUrls.push(e.url)});new s({carCompany:e.body.carCompany,photos:resultantUrls,modelName:e.body.modelName,modelYear:Number(e.body.modelYear),color:e.body.color,kilometersDriven:Number(e.body.kilometersDriven),condition:e.body.condition,description:e.body.description,basePrice:Number(e.body.basePrice),fullPrice:Number(e.body.fullPrice),ownerId:e.user._id,currentBid:e.body.currentBid,bidTimelineId:e.body.bidTimelineId,currentBidUserId:e.body.currentBidUserId,status:"pending for approval",endTime:e.body.endTime}).save().then(e=>t.status(200).json({message:"Listing added successfully!!",carDetails:e})).catch(e=>t.status(400).json("Error: "+e))})}catch(e){t.status(400).json("Error: "+e)}},t.updateCar=async(e,t)=>{s.findById(e.params.id).then(r=>{r.carCompany=e.body.carCompany,r.modelName=e.body.modelName,r.modelYear=Number(e.body.modelYear),r.color=e.body.color,r.kilometersDriven=Number(e.body.kilometersDriven),r.condition=e.body.condition,r.basePrice=Number(e.body.basePrice),r.fullPrice=Number(e.body.fullPrice),r.ownerId=e.body.ownerId,r.currentBid=e.body.currentBid,r.bidTimelineId=e.body.bidTimelineId,r.currentBidUserId=e.body.currentBidUserId,r.status=e.body.status,r.save().then(()=>t.json("Car updated!")).catch(e=>t.status(400).json("Error: "+e))}).catch(e=>t.status(400).json("Error: "+e))},t.verifyCar=async(e,t)=>{s.findById(e.params.id).then(r=>{r.status=e.body.status,r.save().then(()=>t.json("Car Verified!")).catch(e=>t.status(400).json("Error: "+e))}).catch(e=>t.status(400).json("Error: "+e))},t.rejectCar=async(e,t)=>{s.findById(e.params.id).then(r=>{r.status=e.body.status,r.save().then(()=>t.json("Car Rejected!")).catch(e=>t.status(400).json("Error: "+e))}).catch(e=>t.status(400).json("Error: "+e))},t.deleteCar=async(e,t)=>{s.findByIdAndDelete(e.params.id).then(()=>t.json("Car deleted.")).catch(e=>t.status(400).json("Error: "+e))},t.getById=(e,t)=>{s.findById(e.params.id).then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.getMyListings=async(e,t)=>{const r=await a.find({email:e.params.email},{_id:1});s.find({ownerId:r}).then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.getMyBids=async(e,t)=>{let r=await a.find({email:e.params.email},{_id:1});console.log(r),r=r[0]._id;let i=await n.find({timeline:{$elemMatch:{"user._id":r}}},{carId:1,_id:0});if(i){let e=i.map((function(e){return e.carId}));s.find({_id:{$in:e}}).then(e=>{t.json(e)}).catch(e=>t.status(400).json("Error: "+e))}else t.json([])},t.getAllListings=async(e,t)=>{s.find().then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.placeBid=async(e,t)=>{const r=e.body.car;try{const i=await a.findById(e.body.car.ownerId),d=Number(e.body.bid);if(e.user.email===i.email)return t.status(200).json({message:"Owner is trying to bid"});if(d<r.basePrice)return t.status(200).json({message:"Bid has to be greater than the base price"});{const a=await s.findById(r._id);if(a.lock)t.status(200).json({message:"Someone else's bid is being processed. Please wait some time and try again"});else{await s.findOneAndUpdate({_id:r._id},{lock:!0});const c=await o.startSession();await c.withTransaction(async()=>{if(!(d>a.currentBid))throw new Error("Bidding amount should be greater than current bid");{const a={_id:r._id},o={$inc:{numberOfBids:1},$set:{currentBid:d}};await s.findOneAndUpdate(a,o,{session:c});const u={user:e.user,bid:d,time:new Date},l=await n.findOne({carId:r._id});if(l){const e=l.timeline;e.push(u),await n.findOneAndUpdate({carId:r._id},{timeline:e},{session:c}),await c.commitTransaction(),t.status(200).json({message:"Bid added successfully!!"})}else{const e=new n({carId:r._id,ownerId:i._id,timeline:[u]});await e.save({session:c}),await s.findOneAndUpdate({_id:r._id},{lock:!1},{session:c}),await c.commitTransaction(),t.status(200).json({message:"Bid added successfully!!",carDetails:e})}}await s.findOneAndUpdate({_id:r._id},{lock:!1},{session:c}),c.endSession()})}}}catch(e){await s.findOneAndUpdate({_id:r._id},{lock:!1}),console.log(e),t.status(500).json({message:e})}},t.placeBidCheck=async(e,t)=>{try{const r=await a.findById(e.body.car.ownerId);e.user.email===r.email?t.status(200).json({check:!1,message:"Owner cannot bid on his own car"}):"admin"===e.user.role?t.status(200).json({check:!1,message:"Admin cannot bid on his own car"}):t.status(200).json({check:!0})}catch(e){console.log(e),t.status(500).json({message:e})}},t.getHistory=async(e,t)=>{n.findOne({carId:e.params.id}).then(e=>t.status(200).json({history:e})).catch(e=>t.status(400).json("Error: "+e))}},function(e,t,r){const s=r(0),n=new(0,s.Schema)({carId:{type:s.Schema.Types.ObjectId,refPath:"Car",required:!0},ownerId:{type:s.Schema.Types.ObjectId,refPath:"User",required:!0},timeline:{type:Array}},{timestamps:!0}),a=s.models.Timeline||s.model("Timeline",n);e.exports=a},function(e,t,r){const s=r(14).v2;s.config({cloud_name:"dugpy2nmx",api_key:"292243955187647",api_secret:"vvn3vMsDLIvo6p53MGVrWIXYl1I"}),e.exports=s},function(e,t){e.exports=require("cloudinary")},function(e,t,r){const s=r(16),n=r(17);0===s.apps.length&&s.initializeApp({credential:s.credential.cert(n)}),e.exports=s},function(e,t){e.exports=require("firebase-admin")},function(e){e.exports=JSON.parse('{"type":"service_account","project_id":"biddingcars-363616","private_key_id":"388559846437fed3fd3708a1eecdcecde61ec8aa","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXhmNAJk+4XNjZ\\nAq1uge8K2FNnk1DRj9M1HDcXRnEEjl/BDRskJchiScH7vVIEgbVHvEeCuPE1SvYp\\n/rcD6SQ/FIrOhUFX9cdhujY40eNKXRg3uD/AYcETC9sDeKbXlfRmHLCXJimYsGqV\\nKq841m7MI3jykpv48AfukXoSwEHPCYDDDPmPdbouiQpaOugsbqb2YSmtQgjXuEP4\\nuGCqqSNnMMwUxmCKML2gs+HiZE2ELw/Pg2TgDeR0ZNCQHfl7cPRBBKkFzi/WpDtH\\ntFb8lEl7TwaYm1o5mbexOSZQUSy2JwSD/S36z0WtPvuMXCEozszxi0x/30o5vrtx\\nF+fzydRDAgMBAAECggEAAwFaLZcKRLypW7XXDRaMUFmVtJEHl33JRsfjpdVdVNBN\\na42gKK7hKGXlxYxDOK3+k54oiES1Gq/9GDx3knRze2wjtqXjnmQptgap9aWKuFpb\\n/8WVP3JmOxj57o8xi/Fq8q2F/nF2KL5IVuNiV00VedIISj4IfumlK/ZRsVaD16CE\\n+Q5pKz9NneDY2TTZPk5LdvmB57zCbBnAz+lXXVPJc4lw7euI5K3LvwKeGpXSd+FM\\nle+Nw+pud5JW1mb+RnsYxoAF2jPeVZmsRN3BwPyQUoN3bKruZhkLcaTVA9PFrlvP\\nfCOP/p4ht6j7F4UEIlbmUr3GZyQ7+4Qprt2fU56fUQKBgQDMRWSbVEB3G17Nifba\\nGol8KMXkI6KjIXqTqsNkcgqyGPlPEcRXEdnzasNsvIiYkMVih1hVdFbVFbinXG5W\\nE1Zvp6hlc7ON0ZkqeoMXcqqdbzl+eNxrnWH34l2zLWGlzB2qyZ92i5Wx05kW3x4y\\nPnD7VTQlthBBLx6AIoMPUj0EEwKBgQC95Ym7KOW4v6IaAkB8qKbQBcZtTkakAggR\\n/cTPUQsi0tElwhZ1OXFC6Z2mtMJB09kwb6D+IM2Z0ukAx6kSOl8BaZMT1P16LTgg\\ne+nMRqh0Q0VvadOqCJ26OTh5/49IhX7+BpNkOJzOauyMT/+aBsDRpgmGhYoDaXXy\\nbjJ3KN0VEQKBgDJ0wZEMko/ZFuW2Ol9NRsCAYcEkfDvHPTvUZkcdVD8BpDM/tDu9\\nkRRrPrJRL3xf5iGcRNl2zyv7HY1Za3efdy5FP3cvyR4ys56mfFMCY9pXauAugmOi\\nkFxmcbaccw49CObyvozNlcBDAAGCQzct7UJnnWXjPsibFvGXlL/oFGI5AoGAa7+M\\ncPf5sOR7VAqnEJSZYjuEpYzepDzK23qEa6XujanVJnmESKt5SqBH5cl21+ceu077\\nqHZwcrGrp9eiZUddlO2UmJIn6WUzDauBs3j8KEvrYBZKFZah+IJzOzX41Qt6TSTq\\nCNnej3k4Ez1pKLpgOhTeHsgy0VDLre09EUPMfiECgYAn9M+bJDtGA3a2XmOqI61f\\ns97C1izhY3Yo5RMe3QmRvV1DsYsaK96gMV7phtm6GzAwv5bt4UzmaTJ/FmtITk0a\\nsrUeYbvlZ5mfyZH5E2CYZIKDj6xIQQEQeu784rXGl8nqbR5qyS8M5jfJIOQTRb5D\\niQ38e8FAwmTRb9ujpXkYzQ==\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-ulaf9@biddingcars-363616.iam.gserviceaccount.com","client_id":"101720513215993324906","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ulaf9%40biddingcars-363616.iam.gserviceaccount.com"}')},function(e,t,r){const s=r(19),n=r(20);e.exports=s({storage:s.diskStorage({}),fileFilter:(e,t,r)=>{let s=n.extname(t.originalname);".jpg"===s||".jpeg"===s||".png"===s?r(null,!0):r(new Error("File type is not supported"),!1)}})},function(e,t){e.exports=require("multer")},function(e,t){e.exports=require("path")},function(e,t,r){const s=r(3).Router(),{getUsers:n,addUser:a,getUserById:i,getUserByEmail:o,updateUserByEmail:d}=r(22);let c=r(5);s.get("/",n),s.get("/:email",c,o),s.get("/:id",c,i),s.post("/add",c,a),s.post("/update",c,d),e.exports=s},function(e,t,r){let s=r(4);t.getUsers=(e,t)=>{s.find().then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.getUserById=(e,t)=>{s.findById(e.params.id).then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.getUserByEmail=(e,t)=>{s.findOne({email:e.params.email}).then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.addUser=async(e,t)=>{console.log("add user function",e.body);if(await s.findOne({email:e.body.email}))t.status(400).json("Error: User already Exists");else{new s({firstname:e.body.firstname,lastname:e.body.lastname,email:e.body.email,role:e.body.role,isVerified:!1}).save().then(()=>t.json("User added!")).catch(e=>t.status(400).json("Error: "+e))}},t.updateUserByEmail=async(e,t)=>{try{try{console.log("updateUserByEmail",e.headers.user)}catch(e){console.log("user object not ")}await s.updateOne({email:e.body.email},{$set:{email:e.body.newemail,firstname:e.body.firstName,lastname:e.body.lastName,address:e.body.address,city:e.body.city,state:e.body.state,zipCode:e.body.zipCode,country:e.body.country,mobileNumber:e.body.mobile}}),t.status(200).json("Message: User Updated")}catch(e){t.status(400).json("Error: "+e)}}},function(e,t,r){const s=r(3).Router(),{getCarddetails:n,addCarddetails:a}=r(24);let i=r(5);s.get("/",n),s.post("/add",i,a),e.exports=s},function(e,t,r){let s=r(25);r(4);t.getCarddetails=(e,t)=>{s.find().then(e=>t.json(e)).catch(e=>t.status(400).json("Error: "+e))},t.addCarddetails=async(e,t)=>{new s({customerId:e.user._id,customerName:e.body.name,cardNumber:Number(e.body.cardnumber),expiryDate:e.body.expiry,cardType:e.body.cardtype,cvv:Number(e.body.cvv)}).save().then(()=>t.json("Card details added!")).catch(e=>t.status(400).json("Error: "+e))}},function(e,t,r){const s=r(0),n=new(0,s.Schema)({customerId:{type:s.Schema.Types.ObjectId,refPath:"User"},customerName:{type:String,required:!0},cardNumber:{type:Number,required:!0},expiryDate:{type:String},cardType:{type:String,enum:["creditCard","debitCard"],required:!0},cvv:{type:Number}},{timestamps:!0}),a=s.models.Carddetails||s.model("Carddetails",n);e.exports=a}]));