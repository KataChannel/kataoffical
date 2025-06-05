#!/usr/bin/expect
spawn ssh root@116.118.49.243 
expect "password:"
send "mật-khẩu\n"
interact