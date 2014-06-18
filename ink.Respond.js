/**
 * Respond
 * Helper for respondive websites
 *
 * @module Ink.EXT.Respond_1
 * @author jtavares <Jonathan.tavares@telecom.pt>
 * @version 1
 */
Ink.createExt('Respond', 1,  [ 'Ink.Dom.Event_1',
                               'Ink.UI.Common_1',
                               'Ink.Dom.Element_1',
                               'Ink.Dom.Css_1',
                               'Ink.Util.Array_1' ], function( InkEvent, InkCommon, InkElement, InkCss, InkArray ){

    var Respond = function(options) {
        this.options = InkCommon.options('Respond', {
              //'anobject': ['Object', null],  // Defaults to null
              //'target': ['Element', null],
              //'stuff': ['Number', 0.1],
              'delay': ['Integer', 200],
              'debug': ['Boolean', false],
              'target': ['Elements', document.body],
            }, options || {});

        this._init();
    };


    Ink.extendObj(Respond.prototype , {


        /**
         * Logs stuff to the console if [options.debug] is set
         *
         * @method log
         * @public
        */
        log:  function(){
            if(this.options.debug){
                if(typeof arguments[0] == 'string'){
                    arguments[0] = 'Respond > '+arguments[0];
                }
                //Ink.bindMethod(console,'log',arguments)()
                console.log.apply(console,arguments)
            }
        },


        /**
         * INIT
         *
         * @method _init
         * @private
        */
        _init: function() {
            this.log('> _INIT');
            this._HTML = Ink.s('html');
            this._validClasses = [];

            InkEvent.observe(window, 'resize', InkEvent.throttle(Ink.bindEvent(this.update,this),this.options.delay));

            return this.update();
        },


        update: function(){
            this.log("update");
            if(this._validClasses.length>0){
                InkCss.removeClassName(this.options.target, this._validClasses);
            }
            InkCss.removeClassName(this.options.target, 'landscape, portrait');

            InkCss.addClassName(this.options.target,this.getView());
            InkCss.addClassName(this.options.target,this.getOrientation());
        },

        getView: function(){
            var view = window.getComputedStyle( this._HTML , ':after').getPropertyValue('content');
                view = JSON.parse(view.replace(/'/g,"").toString()).name.toString();
            this._validClasses.push(view);
            this._validClasses = this._validClasses.filter(function (e, i, arr) {
                                    return arr.lastIndexOf(e) === i;
                                });
            return view;
        },

        getOrientation: function(){
            var h = InkElement.viewportHeight();
            var w = InkElement.viewportWidth();

            if(w>h){
                return 'landscape';
            }else{
                return 'portrait';
            }

        }


    });


    return Respond;

});
