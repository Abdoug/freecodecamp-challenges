#!/usr/bin/python

import socket

socketserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Works on Windows
hostname = socket.gethostname()
ip = socket.gethostbyname(hostname)
port = 444

print(ip)

socketserver.bind((ip, port))
socketserver.listen(3)

while True:
    clientsocket, address = socketserver.accept()

    print("Received connection from %s " % str(address))

    message = "Hello! Thank you for connecting to the server"

    clientsocket.send(message.encode('ascii'))
    clientsocket.close()