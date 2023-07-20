#!/usr/bin/python

import socket

socketclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

hostname = socket.gethostname()
ip = socket.gethostbyname(hostname)
port = 444

try:
    socketclient.connect((ip, port))

    message = socketclient.recv(1024)

    socketclient.close()

    print(message.decode('ascii'))
except:
    print("Error: Couldn't connect to the server!")
