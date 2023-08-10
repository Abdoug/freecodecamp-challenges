'use strict';

const BoardModel = require('../models/Board');
const ThreadModel = require('../models/Thread').Thread;
const ReplyModel = require('../models/Reply').Reply;

module.exports = function (app) {
  app.route('/api/threads/:board')
    .post((req, res) => {
      let {
        text,
        delete_password,
        board
      } = req.body;

      if (!board) board = req.params.board;

      const newThread = new ThreadModel({
        text,
        delete_password,
        replies: []
      });

      BoardModel.findOne({ name: board }).then(boardData => {
        if (!boardData) {
          boardData = new BoardModel({
            name: board,
            threads: []
          })
        }

        boardData.threads.push(newThread)
        boardData.save()

        res.json(newThread)
      }).catch(err => {
        res.send("There was an error while saving in post")
      })
    })
    .get((req, res) => {
      const board = req.params.board;
      
      BoardModel.findOne({
        name: board
      }).then(data => {
        const threads = data.threads.map((thread) => {
            const {
              _id,
              text,
              created_on,
              bumped_on,
              reported,
              delete_password,
              replies,
            } = thread;
            return {
              _id,
              text,
              created_on,
              bumped_on,
              reported,
              delete_password,
              replies,
              replycount: thread.replies.length,
            };
          });

          res.json(threads);
      }).catch(err => {
        res.send("Error while trynna get board data: " + err)
      })
    })
    .put((req, res) => {
      const {
        report_id
      } = req.body
      const board = req.params.board

      BoardModel.findOne({ name: board })
      .then(data => {
        const date = new Date()
        let reportedThread = data.threads.id(report_id)
        reportedThread.reported = true
        reportedThread.bumped_on = date
        
        data.save()
        res.send("success")
        return
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
      const { thread_id, text, delete_password } = req.body
      const board = req.params.board
      const newReply = new ReplyModel({
        text,
        delete_password
      })

      BoardModel.findOne({ name: board })
      .then(data => {
        const date = new Date()
        let threadToAddReply = data.threads.id(thread_id)
        
        threadToAddReply.bumped_on = date
        threadToAddReply.replies.push(newReply)

        data.save()
        res.json(data)
      }).catch(err => {
        res.send("There was an error while trynna add a Reply")
      })
    })
    .get((req, res) => {
      const board = req.params.board

      BoardModel.findOne({ name: board })
        .then(data => {
          const thread = data.threads.id(req.query.thread_id)
          
          if (!thread) return res.json({ error: "No board with this name" })
          
          res.json(thread)
          return
        }).catch(err => {
          res.send("There was an error while trynna add a Reply")
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
          res.send("success")

          return
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
            reply.deleteOne()
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
