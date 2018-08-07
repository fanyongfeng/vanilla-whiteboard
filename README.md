# nebula

> nebula 高性能较教学白板
> High performance, pluggable, elegant whiteboard for modern internet education.
> 轻量，高性能，可定制，可扩展，“数学化”，矢量化，便于结构化数据（传输），零依赖，可以方便面向3D的
> 不依赖任何库，纯JS实现


> features：
* TM+已支持所有图形
* 数学图形，圆规，画
* Canvas 动画、场景
* editable mode, readonly mode.
>

# 白板共分为3层

最上层：操作层，包括事件绑定，各种辅助线（包括拖拽框，边界路径），鼠标手等动态内容
中层：图形层，包括所有鼠标绘制的白板图形（不包括鼠标手）
最下层：背景层，包括坐标轴，对其网格等

# 文件夹结构
```

```
```
-commands
  处理所有的命令（包括: redo, undo, delete, copy,  move, scale, etc.）
-lib
  canvas及图形相关lib
-tools
  反应在鼠标键盘io上的绘制和操作工具
-util
  工具方法
```
```
APIs

import
export
trace
high-pref / full-feats


```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Sample

* 吃豆子
* 动画
* 签名
*
