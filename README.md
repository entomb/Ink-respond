[Ink](https://github.com/sapo/ink)-respond
===========

Small helper for respondive websites. Ink.Respond.js will add a classname to your body tag, depending on wich CSS media query you'r in. also: portrait or landscape. this is cool for overwrites and skining on top of SAPO's [Ink](https://github.com/sapo/ink).



##Instance
Load as an Ink plugin.
```html
<script type="text/javascript" src="/js/ink.Respond.js"></script>
<script type="text/javascript">
    Ink.requireModules(['Ink.Ext.Respond_1'], function(Respond) {
        var Respond = new Respond({
                        'delay': 200,
                        'target': document.body,
                        'debug': false
                    });
    });
</script>
```


###options
- `delay (int)` throttle delay to the onResize event in microseconds
- `target (element)` the element that will receive the class names
- `debug (bool)` will show some console.log data
 

#Usage
Respond will catch resize events and add the correct class name to the body (by default) tag:

```html 
<body class='xlarge landscape'>

<body class='medium landscape'>

<body class='small portrait'>
```

to skin specific breakpoints, use simple CSS

```css

body.small div.article{
  font-size:.6em;
}

body.large div h3{
  font-size:2em;
}


body.small.portrait div a.options{
  display:none;
}

```
