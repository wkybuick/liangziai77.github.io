/*
直播 - 秋名山见 1.3
2018年9月6日
更新：提高房间刷新频率，优化脚本代码。
内容不可描述
by：iPhone 8、小良
https://ae85.cn/

*/

var template = [{
  type: "image",
  props: {
    id: "tx",
    radius: 30
  },
  layout: function(make, view) {
    make.top.inset(1)
    make.centerX.equalTo(view.center)
    make.width.height.equalTo(60)

  }
}, {
  type: "label",
  props: {
    id: "mc",
    textColor: $color("#149bcc"),
    align: $align.center
  },
  layout(make, view) {
    make.right.left.inset(0)
    make.top.equalTo($("tx").bottom).inset(5)
    make.height.equalTo(30)
  }
}, ]
const mrhb = {
  type: "button",
  props: {
    id: "hb_img",
    radius: 30,
    src: "https://ae85.cn/img/hb.jpg",
  },
  events: {
    tapped: function(sender) {
      $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other")
    }
  },
  layout: function(make, view) {
    make.bottom.inset(30)
    make.width.height.equalTo(60)
    make.right.inset(15)
  }
}

var szan = {
  type: "button",
  props: {
    id: "hb_img",
    src: "https://ae85.cn/img/xl.png",
  },
  events: {
    tapped: function(sender) {
      sz()
    }
  },
  layout: function(make, view) {
    make.bottom.inset(110)
    make.width.height.equalTo(60)
    make.right.inset(15)
  }
}
if (typeof($cache.get("acquiescence")) == "undefined") {
  $cache.set("acquiescence", 0)
}

var urls = [{
    name: "VLC",
    url: "vlc://",
    store: "https://itunes.apple.com/cn/app/vlc-for-mobile/id650377962?mt=8"
  },{
    name: "OPlayer Lite",
    url: "OPlayerLite://",
    store: "https://itunes.apple.com/cn/app/%E6%92%AD%E6%94%BE%E5%99%A8oplayer-lite-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8/id385907472?mt=8"
  }, 
  {
    name: "nPlayer",
    url: "nplayer-",
    store: "https://itunes.apple.com/cn/app/nplayer-lite/id1078835991?mt=8"
  }
]

$ui.render({
  props: {
    title: "直播 - 秋名山见 1.3"
  },
  views: [{
    type: "matrix",
    props: {
      columns: 4,
      itemHeight: 98,
      spacing: 3,
      template: template
    },
    layout: function(make) {
      make.top.left.bottom.right.equalTo(0)
    },
    events: {
      didSelect: function(sender, indexPath, obj) {
        getlist(obj.id, obj.mc.text)
      },
    }
  }, szan, mrhb]
})

const base64 = "aHR0cDovL2FlODUuYlzvcGluL3piMy5qc29u"
$ui.loading(true)
$http.get({
  url: $text.base64Decode(base64.replace(/lz/, "24")),
  handler: function(resp) {
    $ui.loading(false)
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      $cache.set("info", info)
      if (info.version != "1.3") {
        $ui.alert({
          title: "温馨提示",
          message: info.Ucontent,
          actions: [{
            title: "进入官网",
            handler: function() {
              $app.openBrowser({ url: info.xl })
            }
          }, {
            title: "关注公众号",
            handler: function() {
              $ui.alert({
                title: "温馨提示",
                message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                actions: [{
                  title: "跳转微信",
                  handler: function() {
                    $clipboard.text = "ae85-cn"
                    $app.openURL("weixin://")
                  }
                }, {
                  title: "取消"
                }]
              })
            }
          }]
        })
      } else {
        tcgg(info.dont)
        getpt()
      }

    } else {
      $ui.alert("加载失败")
    }
  }
})

function tcgg(gg) {
  if ($file.exists("gg.txt")) {
    var file = $file.read("gg.txt").string
    $console.info(file)
    if (file != gg) {
      xrwj(gg)
    }
  } else {
    xrwj(gg)
  }
}

function xrwj(nr) {
  $ui.alert({
    title: "最新动态",
    message: nr,
    actions: [{
      title: "知道了"
    }]
  })
  $file.write({
    data: $data({ string: nr }),
    path: "gg.txt"
  })
}

function getpt() {
  var key = $cache.get("info").turl
  $ui.loading(true)
  $http.get({
    url: $text.base64Decode(key.replace(/lz/, "XB")) + "json.txt",
    header: {
      "User-Agent": "0.0.12 (iPhone; iPhone OS 10.3.3; zh_CN)"
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.pingtai
      var data = []
      for (i in json) {
        var arr = json[i]
        data.push({
          tx: { src: arr.xinimg },
          mc: { text: `${arr.title}(${arr.Number})` },
          id: arr.address
        })
      }
      $("matrix").data = data
      $("matrix").endRefreshing()
    }
  })
}

function getlist(id, mc) {
  var key = $cache.get("info").turl
  $ui.loading(true)
  $http.get({
    url: $text.base64Decode(key.replace(/lz/, "XB")) + id,
    header: {
      "User-Agent": "0.0.12 (iPhone; iPhone OS 10.3.3; zh_CN)"
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.zhubo
      var data = []
      for (i in json) {
        var arr = json[i]
        data.push({
          tx: { src: arr.img },
          mc: { text: arr.title },
          id: arr.address
        })
      }
      $ui.push({
        props: {
          title: mc + " - 主播列表"
        },
        views: [{
          type: "matrix",
          props: {
            columns: 4,
            itemHeight: 98,
            spacing: 3,
            template: template,
            data: data
          },
          layout: function(make) {
            make.top.left.bottom.right.equalTo(0)
          },
          events: {
            didSelect: function(sender, indexPath, obj) {
              openbf(obj.id)
            },
          }
        }, szan, mrhb]
      })
    }
  })
}

function openbf(url) {
  var bbf = urls[$cache.get("acquiescence")]
   var canOpen = $app.openURL(bbf.url + url); 
  if (!canOpen) {
    $ui.alert({
      message: "请先安装 " + bbf.name,
      actions: [{
          title: "跳转安装",
          handler: function() {
            $app.openURL(bbf.store);
          }
        },
        {
          title: "设置其他播放器",
          handler: function() {
            sz()
          }
        }
      ]
    })
  }
  return canOpen;
}

function sz() {
  $ui.push({
    props: {
      title: "设置"
    },
    views: [{
      type: "list",
      props: {
        data: [{
          title: "选择设置默认播放器",
          rows: [{
            type: "tab",
            props: {
              items: urls.map(function(item) { return item.name }),
              index: $cache.get("acquiescence")

            },
            layout: $layout.center,
            events: {
              changed: function(sender) {
                $cache.set("acquiescence", sender.index)

              }
            }
          }]
        }, {
          title: "安装播放器",
          rows: [" VLC       -  跳转App Store商店下载", "OPlayer -  跳转App Store商店下载", " nPlayer -  跳转App Store商店下载"]
        }, {
          title: "使用帮助",
          rows: ["作者官网", "微信公众号", "关于脚本"]
        }],
        footer: {
          type: "label",
          props: {
            height: 100,
            lines: 0,
            text: "by：iPhone 8、小良\nhttps://ae85.cn/",
            textColor: $color("#198567"),
            align: $align.center,
            font: $font(16)
          }
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          if (data == " VLC       -  跳转App Store商店下载") {
            $app.openURL(urls[0].store)
          } else if (data == "OPlayer -  跳转App Store商店下载") {
            $app.openURL(urls[1].store)
          } else if (data == " nPlayer -  跳转App Store商店下载") {
            $app.openURL(urls[2].store)
          } else if (data == "作者官网") {
            web("https://ae85.cn/", "iPhone 8、小良")
          } else if (data == "微信公众号") {
            web("https://ae85.cn/lxfs.html", "微信公众号-小良Ge")
          } else if (data == "关于脚本") {
            $ui.alert("关于脚本\n版本：v1.3\n脚本由小良编写\n如有问题欢迎反馈")
          }
        }
      }
    }]
  })
}

function web(url, text) {
  $ui.push({
    props: {
      title: text
    },
    views: [{
        type: "web",
        props: {
          url: url
        },
        layout: $layout.fill
      }

    ]
  })

}