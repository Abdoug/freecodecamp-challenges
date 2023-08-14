'use strict';

const BoardModel = require('../models/Board').Board;
const ThreadModel = require('../models/Thread').Thread;
const ReplyModel = require('../models/Reply').Reply;

module.exports = function (app) {
  app.route('/api/threads/:board')
    .post((req, res) => {
      const { text, delete_password } = req.body;
      let board = req.body.board;
      
      if (!board) {
        board = req.params.board;
      }

      const newThread = new ThreadModel({
        text: text,
        delete_password: delete_password,
        replies: [],
      });

      BoardModel.findOne({ name: board }).then((Boarddata) => {
        if (!Boarddata) {
          const newBoard = new BoardModel({
            name: board,
            threads: [],
          });

          newBoard.threads.push(newThread);
          newBoard.save();
        } else {
          Boarddata.threads.push(newThread);
          Boarddata.save();
        }

        res.json(newThread);
      });
    })
    .get((req, res) => {
      const board = req.params.board;
      
      BoardModel.findOne({
        name: board
      })
      .then(data => {
        const threads = data.threads.sort((a, b) => new Date(b.bumped_on) - new Date(a.bumped_on)).slice(0, 10).map((thread) => {
            const replies = thread.replies.sort((a, b) => new Date(b.bumped_on) - new Date(a.bumped_on)).slice(0, 3).map(reply => {
              const {
              _id,
              text,
              created_on,
              bumped_on,
            } = reply;

            return {
              _id,
              text,
              created_on,
              bumped_on,
            };
            })
            const {
              _id,
              text,
              created_on,
              bumped_on,
            } = thread;

            return {
              _id,
              text,
              created_on,
              bumped_on,
              replies,
              replycount: thread.replies.length,
            };
          });

          console.log('TTT: ', threads[0].replies)

          res.json(threads);
      }).catch(err => {
        res.send("Error while trynna get board data: " + err)
      })
    })
    .put((req, res) => {
      const {
        thread_id
      } = req.body
      const board = req.params.board

      BoardModel.findOne({ name: board })
      .then(data => {
        const date = new Date()
        let reportedThread = data.threads.id(thread_id)
        reportedThread.reported = true
        reportedThread.bumped_on = date
        
        data.save()
        res.send("reported")
      }).catch(err => {
        res.send("There was an error while trynna report the thread " + err)
      })
    })
    .delete((req, res) => {
      const { thread_id, delete_password } = req.body
      const board = req.params.board

      BoardModel.findOne({ name: board })
      .then(data => {
        let threadToBeDeleted = data.threads.id(thread_id)

        if (delete_password !== threadToBeDeleted.delete_password) return res.send("incorrect password")

        threadToBeDeleted.deleteOne()
        data.save()
        res.send("success")
      }).catch(err => {
        res.send("There was an error while trynna delete a thread: " + err)
      })
    });
    
  app.route('/api/replies/:board')
    .post((req, res) => {
      const { thread_id, text, delete_password } = req.body;
      const board = req.params.board;
      const date = new Date();
      const newReply = new ReplyModel({
        text: text,
        delete_password: delete_password,
        created_on: date,
      });

      BoardModel.findOne({ name: board }).then((boardData) => {
        if (!boardData) {
          res.json("error", "Board not found");
        } else {
          let threadToAddReply = boardData.threads.id(thread_id);
          threadToAddReply.bumped_on = date;
          threadToAddReply.replies.push(newReply);
          boardData.save();
          res.json(boardData);
        }
      });
    })
    .get((req, res) => {
      const board = req.params.board
      const thread_id = req.query.thread_id

      BoardModel.findOne({ name: board })
        .then(data => {
          const thread = data.threads.id(thread_id)
          
          if (!thread) return res.json({ error: "No board with this name" })

          res.json({
            _id: thread._id,
            text: thread.text,
            created_on: thread.created_on,
            bumped_on: thread.bumped_on,
            replies: thread.replies.map(reply => {
              const {
              _id,
              text,
              created_on,
              bumped_on,
            } = reply;

            return {
              _id,
              text,
              created_on,
              bumped_on,
            };
            }),
          })
        }).catch(err => {
          res.send("There was an error while trynna get a Reply")
        })
    })
    .put((req, res) => {
      const { thread_id, reply_id } = req.body
      const board = req.params.board

      BoardModel.findOne({ name: board })
        .then(data => {
          let thread = data.threads.id(thread_id)
          let reply = thread.replies.id(reply_id)

          reply.reported = true
          reply.bumped_on = new Date()

          data.save()
          res.send("reported")
        }).catch(err => {
          res.send("There was an error while trynna report a Reply")
        })
    })
    .delete((req, res) => {
      const { thread_id, reply_id, delete_password } = req.body
      const board = req.params.board

      BoardModel.findOne({ name: board })
        .then(data => {
          if (!data) {
            res.json({ error: "No board with this name" });
          }

          let thread = data.threads.id(thread_id)
          let reply = thread.replies.id(reply_id)
      
          if (reply.delete_password === delete_password) {
            reply.text = "[deleted]"
          } else {
            res.send("incorrect password")
            return
          }

          data.save()
          res.send("success")
        }).catch(err => {
          res.send("There was an error while trynna delete a Reply " + err)
        })
    });
};
