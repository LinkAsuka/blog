(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{290:function(s,a,t){"use strict";t.r(a);var n=t(13),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"linux安装nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux安装nginx"}},[s._v("#")]),s._v(" LINUX安装nginx")]),s._v(" "),a("p",[s._v("1.安装依赖包")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("//一键安装上面四个依赖\nyum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel\n")])])]),a("p",[s._v("2.下载并解压安装包")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("//创建一个文件夹\ncd /usr/local\nmkdir nginx\ncd nginx\n//下载tar包\nwget http://nginx.org/download/nginx-1.13.7.tar.gz\ntar -xvf nginx-1.13.7.tar.gz\n")])])]),a("p",[s._v("3.安装nginx")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("//进入nginx目录\ncd /usr/local/nginx\n//进入目录\ncd nginx-1.13.7\n//执行命令 考虑到后续安装ssl证书 添加两个模块\n./configure --with-http_stub_status_module --with-http_ssl_module\n//执行make命令\nmake\n//执行make install命令\nmake install\n")])])]),a("p",[s._v("4.启动nginx服务")]),s._v(" "),a("p",[s._v("/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf")]),s._v(" "),a("p",[s._v("4.配置nginx.conf")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("# 打开配置文件\nvi /usr/local/nginx/conf/nginx.conf\n")])])]),a("p",[s._v("将端口号改成8089(随便挑个端口)，因为可能apeache占用80端口，apeache端口尽量不要修改，我们选择修改nginx端口。")]),s._v(" "),a("p",[s._v("将localhost修改为你服务器的公网ip地址。")]),s._v(" "),a("p",[s._v("5.重启nginx")]),s._v(" "),a("p",[s._v("/usr/local/nginx/sbin/nginx -s reload")]),s._v(" "),a("p",[s._v("查看nginx进程是否启动：")]),s._v(" "),a("p",[s._v("ps -ef | grep nginx")]),s._v(" "),a("p",[s._v("6.若想使用外部主机访问nginx，需要关闭服务器防火墙或开放nginx服务端口，端口为上一步nginx.conf的配置端口：")]),s._v(" "),a("p",[s._v("centOS6及以前版本使用命令： systemctl stop iptables.service")]),s._v(" "),a("p",[s._v("centOS7关闭防火墙命令： systemctl stop firewalld.service")]),s._v(" "),a("p",[s._v("关闭防火墙会导致服务器有一定风险，所以建议是单独开放服务端口 ：")]),s._v(" "),a("p",[s._v("开放80端口：")]),s._v(" "),a("p",[s._v("firewall-cmd --zone=public --add-port=80/tcp --permanent")]),s._v(" "),a("p",[s._v("查询端口号80 是否开启：")]),s._v(" "),a("p",[s._v("firewall-cmd --query-port=80/tcp")]),s._v(" "),a("p",[s._v("重启防火墙：")]),s._v(" "),a("p",[s._v("firewall-cmd --reload")]),s._v(" "),a("p",[s._v("随后访问该ip:端口 即可看到nginx界面。")]),s._v(" "),a("p",[s._v("7.访问服务器ip查看（备注，由于我监听的仍是80端口，所以ip后面的端口号被省略）")]),s._v(" "),a("p",[s._v("安装完成一般常用命令")]),s._v(" "),a("p",[s._v("进入安装目录中，")]),s._v(" "),a("p",[s._v("命令： cd /usr/local/nginx/sbin")]),s._v(" "),a("p",[s._v("启动，关闭，重启，命令：")]),s._v(" "),a("p",[s._v("./nginx 启动")]),s._v(" "),a("p",[s._v("./nginx -s stop 关闭")]),s._v(" "),a("p",[s._v("./nginx -s reload 重启")]),s._v(" "),a("h1",{attrs:{id:"vue项目部署404"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue项目部署404"}},[s._v("#")]),s._v(" vue项目部署404")]),s._v(" "),a("p",[s._v("vue项目使用 history路由模式，打包部署后，访问出现404问题")]),s._v(" "),a("h2",{attrs:{id:"方式一"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方式一"}},[s._v("#")]),s._v(" 方式一")]),s._v(" "),a("p",[s._v("需要在nginx配置中加访问路径的重定向")]),s._v(" "),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("location")]),s._v(" /")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try_files")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$uri")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$uri")]),s._v("/ /index.html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("宝塔面板的nginx配置文件路径 /www/server/panel/vhost/nginx")]),s._v(" "),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("listen")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("server_name")]),s._v(" h5.abaqaq.com")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("index")]),s._v(" index.php index.html index.htm default.php default.htm default.html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("root")]),s._v(" /www/wwwroot/h5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try_files")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$uri")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$uri")]),s._v("/ /index.html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("h2",{attrs:{id:"方式二"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方式二"}},[s._v("#")]),s._v(" 方式二")]),s._v(" "),a("p",[s._v("或者在宝塔网站伪静态设置里添加此配置")]),s._v(" "),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("location")]),s._v(" /")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" (!-e "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$request_filename")]),s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rewrite")]),s._v("  ^(.*)$ /index.html?s=/"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("  last")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h2",{attrs:{id:"vue路由模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue路由模式"}},[s._v("#")]),s._v(" vue路由模式")]),s._v(" "),a("p",[s._v("hash模式")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载，其显示的网路路径中会有 “#” 号，有一点点丑。这是最安全的模式，因为他兼容所有的浏览器和服务器。\n")])])]),a("p",[s._v("history模式")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("美化后的hash模式，会去掉路径中的 “#”。依赖于Html5 的history，pushState API,所以要担心IE9以及一下的版本，感觉不用担心。并且还包括forward、back、go三个方法，对应浏览器的前进，后退，跳转操作。就是浏览器左上角的前进、后退等按钮进行的操作。")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);