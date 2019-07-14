const HttpStatus=require("http-status-codes")
const Message=require("../models/messageModels")
const Conversation=require("../models/conversationModels")
const User=require("../models/userModels")
const Helper=require("../Helpers/helpers")

module.exports={
    // SendMessage(req,res){
    //    console.log("at message.js in controllers",req.body)

    //    console.log("at message.js in controllers fo params",req.params)
    //  const {sender_Id,reciever_Id}=req.params;
    //  Conversation.find(
    //     {
    //       $or: [
    //         {
    //           participants: {
    //             $elemMatch: { senderId: sender_Id, recieverId: reciever_Id}
    //           }
    //         },
    //         {
    //           participants: {
    //             $elemMatch: { senderId: reciever_Id, recieverId: sender_Id }
    //           }
    //         }
    //       ]
    //     },
    //     async function(err,result){
    //         console.log("the final result ",result)
    //         if (result.length > 0) {
    //             console.log("the final result length ",result)

    //         }else{
    //             //add conv for first time
    //             const newConversation=new Conversation();
    //             newConversation.participants.push({
    //                 senderId:req.user._id,
    //                 recieverId:req.params.recieverId
    //             })

    //             const saveConversation=await newConversation.save();
    //             console.log("conversation saved in messase.js",saveConversation)

    //             const newMessage=new Message();
    //             newMessage.conversationId=saveConversation._id;
    //             newMessage.sender=req.user.username;
    //             newMessage.reciever=req.body.recieverName
    //              newMessage.message.push({
    //                  senderId:req.user._id,
    //                  recieverId:req.params.recieverId,
    //                  sendername:req.user.username,
    //                  recievername:req.body.recieverName,
    //                  body:req.body.message
    //              });

    //              //for sender

    //              await User.update({
    //                  _id:req.user._id
    //              },{
    //                  $push:{
    //                             chatList:{
    //                             $each:[{
    //                                 recieverId:req.params.recieverId,
    //                                 msgId:newMessage._id
    //                             }],
    //                             $position:0
    //                             }   
    //                  }
    //              })
    //  //for reciever
    //              await User.update({
    //                 _id:req.params.recieverId
    //             },{
    //                 $push:{
    //                            chatList:{
    //                            $each:[{
    //                             recieverId:req.user._id,
    //                                msgId:newMessage._id
    //                            }],
    //                            $position:0
    //                            }   
    //                 }
    //             })

    //              await newMessage.save()
    //              .then(()=>{
    //                 res.status(HttpStatus.OK).json({message:"message has been sent and saved"})
    //              })
    //              .catch(err=>{
    //                  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error in sending message"})
    //              })
    //         }
    //     }
        
    //     )
    // }

    async GetAllMessages(req,res){
        const { sender_Id, receiver_Id } = req.params;

        const conversation=await Conversation.findOne({
          $or:[
              {
               $and:[
                   {'participants.senderId':sender_Id},
            {'participants.receiverId':receiver_Id}
             ]   
              }
              ,
               {
                $and:[
                       {'participants.senderId':receiver_Id},
                      {'participants.receiverId':sender_Id}
                    ]   
          }  
          ]
        })
        .select('_id')         //return a partivular object from the field


        if(conversation){
       const messages=await Message.findOne({
        conversationId:conversation._id
       })

       res.status(HttpStatus.OK).json({message:"Returned the messgages",messages})
        }
    },





    SendMessage(req, res) {
      console.log("reqq body of the SemdMesage",req.body)
        const { sender_Id, receiver_Id } = req.params;
    
        Conversation.find(
          {
            $or: [
              {
                participants: {
                  $elemMatch: { senderId: sender_Id, receiverId: receiver_Id }
                }
              },
              {
                participants: {
                  $elemMatch: { senderId: receiver_Id, receiverId: sender_Id }
                }
              }
            ]
          },
          async (err, result) => {
             if (result.length > 0) {
              //  const msg=await Message.findOne({
              //   conversationId:result[0]._id
              //  })

              const msg = await Message.findOne({ conversationId: result[0]._id });
           Helper.updateChatList(req,msg);
                 console.log("result wit lenght",result)
                 await Message.update({
                  conversationId: result[0]._id
                 },{
                     $push:{
                        message: {
                            senderId: req.user._id,
                            receiverId: req.params.receiver_Id,
                            sendername: req.user.username,
                            receivername: req.body.recieverName,
                            body: req.body.message
                     }
                        
                     }
                 })
                       .then(() =>
                  res
                    .status(HttpStatus.OK)
                    .json({ message: 'Message sent successfully with length' })
                )
                .catch(err =>
                  res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured in length' })
                );
                 
            //   const msg = await Message.findOne({ conversationId: result[0]._id });
            //   Helper.updateChatList(req, msg);
            //   await Message.update(
            //     {
            //       conversationId: result[0]._id
            //     },
            //     {
            //       $push: {
            //         message: {
            //           senderId: req.user._id,
            //           receiverId: req.params.receiver_Id,
            //           sendername: req.user.username,
            //           receivername: req.body.receiverName,
            //           body: req.body.message
            //         }
            //       }
            //     }
            //   )
            //     .then(() =>
            //       res
            //         .status(HttpStatus.OK)
            //         .json({ message: 'Message sent successfully' })
            //     )
            //     .catch(err =>
            //       res
            //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
            //         .json({ message: 'Error occured' })
            //     );
            } else {
              const newConversation = new Conversation();
              newConversation.participants.push({
                senderId: req.user._id,
                receiverId: req.params.receiver_Id
              });
    
              const saveConversation = await newConversation.save();
    
              const newMessage = new Message();
              newMessage.conversationId = saveConversation._id;
              newMessage.sender = req.user.username;
              newMessage.receiver = req.body.recieverName;
              newMessage.message.push({
                senderId: req.user._id,
                receiverId: req.params.receiver_Id,
                sendername: req.user.username,
                receivername: req.body.recieverName,
                body: req.body.message
              });
    
              await User.update(
                {
                  _id: req.user._id
                },
                {
                  $push: {
                    chatList: {
                      $each: [
                        {
                          receiverId: req.params.receiver_Id,
                          msgId: newMessage._id
                        }
                      ],
                      $position: 0
                    }
                  }
                }
              );
    
              await User.update(
                {
                  _id: req.params.receiver_Id
                },
                {
                  $push: {
                    chatList: {
                      $each: [
                        {
                          receiverId: req.user._id,
                          msgId: newMessage._id
                        }
                      ],
                      $position: 0
                    }
                  }
                }
              );
    
              await newMessage
                .save()
                .then(() =>
                  res.status(HttpStatus.OK).json({ message: 'Message sent' })
                )
                .catch(err =>
                  res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })
                );
            }
          }
        );
      },
   async MarkReceiverMessages(req,res){
    console.log("MarkReceiverMessages in message",req.params);
   }

}


