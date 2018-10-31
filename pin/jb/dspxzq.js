/*
短视频下载器 1.2
2018年10月30日 更新
修复不能下载问题。
支持 jsbox 同时也支持 pin 

脚本已支持：皮皮虾、抖音、快手、火山、今日头条、西瓜视频、微博、秒拍、小咖秀、晃咖、微视、美拍、网易云音乐、陌陌、映客、小影 等平台的视频。

by：iPhone 8、小良
更多js脚本： http://ae85.cn/

*/
var all_type = [
  { name: "抖音短视频去水印下载", vid: "douyin" },
  { name: "快手短视频去水印下载", vid: "kuaishou" },
  { name: "火山短视频去水印下载", vid: "huoshan" },
  { name: "头条西瓜视频下载", vid: "toutiao" },
  { name: "微博、秒拍、小咖秀、晃咖视频下载", vid: "weibo" },
  { name: "微视短视频去水印下载", vid: "weishi" },
  { name: "美拍短视频下载", vid: "meipai" },
  { name: "网易云音乐视频下载", vid: "yunyinyue" },
  { name: "皮皮虾视频去水印下载", vid: "pipixia" },
  { name: "陌陌视频下载", vid: "momo" },
  { name: "映客视频下载", vid: "inke" },
  { name: "小影小视频下载", vid: "xiaoying" }
];

function cshyz() {
  $ui.render({
    props: {
      title: "短视频下载器"
    },
    views: [
      {
        type: "label",
        props: {
          id: "dx1",
          text: "第一次使用脚本请输入密码进行验证",
          textColor: $color("#ff0000"),
          align: $align.center
        },
        layout(make, view) {
          make.top.inset(10);
          make.left.right.inset(0);
        }
      },
      {
        type: "button",
        props: {
          id: "bt1",
          title: "确定"
        },
        layout: function (make) {
          make.top.equalTo($("dx1").bottom).inset(15);
          make.right.inset(10);
          make.height.equalTo(40);
          make.width.equalTo(100);
        },
        events: {
          tapped: function (sender) {
            var bs = $("wd").text;
            if (yzmm(bs)) {
              $file.write({
                data: $data({ string: bs }),
                path: "key.txt"
              });
              zjm();
            } else {
              $ui.toast("验证失败……");
              $ui.alert(
                "请输入正确的密码\n如果不知道密码\n请到公众号：ae85-cn\n上回复 285 获取"
              );
            }
          }
        }
      },
      {
        type: "input",
        props: {
          id: "wd",
          font: $font(22),
          placeholder: "请输入开起密码...",
          darkKeyboard: true
        },
        layout: function (make, view) {
          make.top.equalTo($("dx1").bottom).inset(15);
          make.left.inset(10);
          make.height.equalTo(40);
          make.right.equalTo($("bt1").left).inset(5);
        },
        events: {
          returned: function (sender) {
            $("wd").blur();
          }
        }
      },
      {
        type: "web",
        props: {
          id: "webyz",
          toolbar: true,
          html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><h1>使用说明：</h1><h2>为了防止脚本和谐速度过快，首次使用脚本，需要开启密码。</h2><h1>密码获取：</h1><h2>前往公众号【VIP视频解析】在聊天窗口中回复〖285〗即可获取。<br></h2><br><h1><a href="http://t.cn/Evovggo">点击观看</a> 视频教程</h1> <h1><a href="http://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><h1><a href="http://ae85.cn/lxfs.html">关注公众号</a> VIP视频解析</h1><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://ae85.cn/">http://ae85.cn/</a> </h2></span></body>`
        },
        layout: function (make) {
          make.top.equalTo($("wd").bottom).inset(10);
          make.bottom.inset(0);
          make.left.right.inset(10);
        }
      }
    ]
  });
}
var file = $file.read("key.txt");
if (!file) {
  cshyz();
} else {
  if (yzmm(file.string)) {
    zjm();
  } else {
    cshyz();
  }
}

function generateStr(a) {
  var c = (function () {
    for (var d = 0, f = new Array(256), g = 0; 256 != g; ++g) {
      (d = g),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (d = 1 & d ? -306674912 ^ (d >>> 1) : d >>> 1),
        (f[g] = d);
    }
    return "undefined" != typeof Int32Array ? new Int32Array(f) : f;
  })(),
    b = function (g) {
      for (var j, k, h = -1, f = 0, d = g.length; f < d;) {
        (j = g.charCodeAt(f++)),
          j < 128
            ? (h = (h >>> 8) ^ c[255 & (h ^ j)])
            : j < 2048
              ? ((h = (h >>> 8) ^ c[255 & (h ^ (192 | ((j >> 6) & 31)))]),
                (h = (h >>> 8) ^ c[255 & (h ^ (128 | (63 & j)))]))
              : j >= 55296 && j < 57344
                ? ((j = (1023 & j) + 64),
                  (k = 1023 & g.charCodeAt(f++)),
                  (h = (h >>> 8) ^ c[255 & (h ^ (240 | ((j >> 8) & 7)))]),
                  (h = (h >>> 8) ^ c[255 & (h ^ (128 | ((j >> 2) & 63)))]),
                  (h =
                    (h >>> 8) ^
                    c[255 & (h ^ (128 | ((k >> 6) & 15) | ((3 & j) << 4)))]),
                  (h = (h >>> 8) ^ c[255 & (h ^ (128 | (63 & k)))]))
                : ((h = (h >>> 8) ^ c[255 & (h ^ (224 | ((j >> 12) & 15)))]),
                  (h = (h >>> 8) ^ c[255 & (h ^ (128 | ((j >> 6) & 63)))]),
                  (h = (h >>> 8) ^ c[255 & (h ^ (128 | (63 & j)))]));
      }
      return h ^ -1;
    };
  return b(a) >>> 0;
}

function geturl(url) {
  var c = Math.random()
    .toString(10)
    .substring(2);
  var a = generateStr(url + "@" + c).toString(10);
  var vid = $cache.get("vid");
  var uhi = "LmlpaWvwYi5jb20";
  var Ori = "http://" + vid + $text.base64Decode(uhi.replace(/vw/, "xh") + "=");
  var lan = "aHR0cDovvw3NlcnZpY2UwvwmlpaWxhYi5jb20vdmlkZW8vd2Vivww";
  $ui.loading(true);
  $http.request({
    method: "POST",
    url: $text.base64Decode(lan.replace(/vw/g, "L") + "==") + vid,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": Ori,
      "Referer": Ori,
      "Cookie": $cache.get("cookie"),
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G34 Safari/601.1"
    },
    body: {
      "link": url,
      "r": c,
      "s": a
    },
    handler: function (resp) {
      $ui.loading(false);
      if (resp.data.retDesc == "成功") {
        var json = resp.data.data;
        var durl = json.video;
        var lurl = durl.download;
        if (lurl) {
          $ui.menu({
            items: lurl.map(function (item) {
              return item.type;
            }),
            handler(title, idx) {
              cut(lurl[idx].url);
            }
          });
        } else {
          cut(durl);
        }
      }
    }
  });
}

var html = `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>脚本已支持：皮皮虾、抖音、快手、火山、今日头条、西瓜视频、微博、秒拍、小咖秀、晃咖、微视、美拍、网易云音乐、陌陌、映客、小影 等平台的视频。<br><br>为了适配jsbox将取消自动提取功能</h2><br><h1><a href="http://t.cn/Evovggo">点击观看</a> 视频教程</h1> <h1><a href="http://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><h1><a href="http://ae85.cn/lxfs.html">关注公众号</a> VIP视频解析</h1><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://ae85.cn/">http://ae85.cn/</a> </h2></span></body>`;

function tmenu() {
  $ui.menu({
    items: all_type.map(function (item) {
      return item.name;
    }),
    handler(title, idx) {
      $cache.set("vid", all_type[idx].vid);
      var text = $("bjk").text;
      var url = $detector.link(text);
      if (!url[0]) {
        $ui.alert("请先输入链接");
      } else {
        $ui.toast("处理中，请稍后···")
        $("webid").url = "http://" + all_type[idx].vid + ".iiilab.com/"
      }
    }
  }); 
}
function zjm() {
  $ui.render({
    props: {
      title: "短视频下载器 1.2"
    },
    views: [
      {
        type: "input",
        props: {
          id: "bjk",
          placeholder: "输入视频地址…"
        },
        layout: function (make) {
          make.top.inset(10);
          make.left.right.inset(10);
          make.height.equalTo(35);
        },
        events: {
          returned: function (sender) {
            blur()
            tmenu();
          }
        }
      },
      {
        type: "button",
        props: {
          title: "点击-这里选择你要提取的视频平台",
          id: "bt1"
        },
        layout: function (make) {
          make.top.equalTo($("bjk").bottom).inset(10);
          make.right.left.inset(10);
          make.height.equalTo(35);
        },
        events: {
          tapped: function (sender) {
            tmenu();
          }
        }
      },
      {
        type: "web",
        props: {
          id: "webxia",
          html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>脚本已支持：皮皮虾、抖音、快手、火山、今日头条、西瓜视频、微博、秒拍、小咖秀、晃咖、微视、美拍、网易云音乐、陌陌、映客、小影 等平台的视频。<br><br>为了适配jsbox将取消自动提取功能</h2><br><h1><a href="http://t.cn/Evovggo">点击观看</a> 视频教程</h1> <h1><a href="http://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><h1><a href="http://ae85.cn/lxfs.html">关注公众号</a> VIP视频解析</h1><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://ae85.cn/">http://ae85.cn/</a> </h2></span></body>`
        },
        layout: function (make) {
          make.top.equalTo($("bt1").bottom).inset(10);
          make.bottom.inset(0);
          make.left.right.inset(10);
        }
      },
      {
        type: "button",
        props: {
          id: "bt3",
          radius: 25,
          src: "http://ae85.cn/wf/hb.jpg",
          font: $font(20)
        },
        layout: function (make) {
          make.right.inset(15);
          make.top.equalTo($("bt1").bottom).inset(20);
          make.height.width.equalTo(50);
        },
        events: {
          tapped: function (sender) {
            $app.openURL(
              "alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other"
            );
          },
          longPressed: function (sender) {
            $("webxia").html = html;
            $("bt4").alpha = 0;
          }
        }
      },
      {
        type: "button",
        props: {
          id: "bt4",
          src: "http://ae85.cn/jsbox/img/xiazai.png",
          font: $font(20),
          alpha: 0
        },
        layout: function (make) {
          make.right.inset(15);
          make.top.equalTo($("bt3").bottom).offset(20);
          make.height.width.equalTo(50);
        },
        events: {
          tapped: function (sender) {
            download($cache.get("url"));
          },
          longPressed: function (sender) {
            var url = $cache.get("url");
            $clipboard.text = url;
            $ui.alert("已复制：\n" + url);
          }
        }
      },
      {
        type: "web",
        props: {
          id: "webid",
          url: "http://kuaishou.iiilab.com/",
          script: function () {
            var Html = window.parent.document.cookie;
            $notify("customEvent", Html);
          }
        },
        layout: function (make, view) {
          make.left.bottom.inset(0);
          make.width.height.equalTo(0);
        },

        events: {
          customEvent: function (object) {
            $cache.set("cookie", object);
            var text = $("bjk").text
            var url = $detector.link(text);
            geturl(url[0]);
          },
        }
      }
    ]
  });
}
function yzmm(t) {
  var a = "YWU4lz5jbg";
  if ($text.base64Decode(a.replace(/lz/, "NS") + "==") == t) {
    return 1;
  } else {
    return 0;
  }
}
function csh() {
  $("bt4").alpha = 0;
  var durl = $clipboard.link;
  if (durl) {
    $("bjk").text = durl;
   // tmenu();
  }
}
function download(url) {
  $ui.toast("正在下载中 ...");
  $ui.loading(true);
  $http.download({
    url: url,
    handler: function (resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        $share.sheet(["download.mp4", resp.data]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}
function cut(url) {
  $cache.set("url", url);
  $("webxia").url = url;
  $("bt4").alpha = 1;
  download(url)
}
csh()