LoginWindow = function (config) {
	this.width = 520;
	this.height = 200;
	this.closable  = false;
	this.title = 'Авторизация';
	this.resizable = false;
	Ext.apply(this,config);
	LoginWindow.superclass.constructor.call(this);
}

Ext.extend(LoginWindow,Ext.Window,{
	onActionComplete : function (f, a){
		if(a && a.result && a.result.success){
			var path = window.location.pathname,
				path = path.substring(0, path.lastIndexOf('/') + 1);
			window.location = path;  // Change this path to redirect to your path
			window.location.reload( false );
		}
	},
	
	initComponent : function () {
				this.submitUrl  = options.loginUrl;
				this.captchaURL = options.captchaUrl;
				var boxCaptcha  = new Ext.BoxComponent({
					columnWidth: .35,	
					autoEl: {
						tag:'img',
						id: 'activateCodeImg',
						title: '',
						src: this.captchaURL + new Date().getTime() + '.jpg'
					},
					listeners : {
						'click': function () {

						}
					}	
				});
				boxCaptcha.on('render',function (){
					var curr = Ext.get('activateCodeImg');
				},this);
				
				this.loginPanel = new Ext.form.FormPanel({
						frame:true,
        				standardSubmit: true,
						height: 100,
						region : 'center',
						id: 'loginpanel',
						baseParams : {
							task : 'login'
						},
						bodyStyle: 'padding:5px',
						tbar: new Ext.Toolbar({
							items: {
            					xtype: 'tbtext',
            					text: '',
								id: 'errorMsgText'
        					}
						}),
						buttons : [
									{
										text : 'Вход',
										handler: function() {
            								var fp = this.ownerCt.ownerCt;
                							var form = fp.getForm();
            	
											if (form.isValid()) {
                								form.getEl().dom.action = options.loginUrl;
												form.submit();
            								}
										}
									},
									{
										text : 'Отмена',
										handler: function()
										{
											location.href = options.cancelUrl;
										}
									}
						],
						items: [
								{
									layout : 'column',
									items : [
										{
											layout : 'form',
											columnWidth:.65,
											layoutConfig: {
												labelSeparator: ''
											},
											items: [{
                								fieldLabel: 'Логин',
                								name: 'login',
												xtype: 'textfield',
                								allowBlank: false,
												blankText: 'Логин',
												anchor: '90%',
												listeners: {
                									specialkey: function(field, e) {
														if (e.getKey() == e.ENTER) {
                											var form = field.ownerCt.ownerCt.ownerCt.getForm();
															if (form.isValid()) {
                												form.getEl().dom.action = options.loginUrl;
																form.submit();
            												}
                    									}
                									}
            									}
            								},{
                								fieldLabel: 'Пароль',
                								name: 'password',
												xtype: 'textfield',
												inputType: 'password',
												allowBlank:false,
												blankText: 'Пароль',
												anchor:'90%',
												listeners: {
                									specialkey: function(field, e) {
                    									if (e.getKey() == e.ENTER) {
                											var form = field.ownerCt.ownerCt.ownerCt.getForm();
															if (form.isValid()) {
                												form.getEl().dom.action = options.loginUrl;
																form.submit();
            												}
                    									}
                									}
            									}
								            },
											{
												fieldLabel: 'Код',
												name: 'code',
												xtype: 'textfield',
												allowBlank:false,
												anchor:'90%',
												listeners: {
                									specialkey: function(field, e) {
                    									if (e.getKey() == e.ENTER) {
                											var form = field.ownerCt.ownerCt.ownerCt.getForm();
															if (form.isValid()) {
                												form.getEl().dom.action = options.loginUrl;
																form.submit();
            												}
                    									}
                									}
            									}
											}]
										}, boxCaptcha
									]
								}
						],
						listeners: {
							'actioncomplete': {
								fn: this.onActionComplete,
								scope: this
							},
							'actionfailed': {
								fn: this.onActionFailed,
								scope: this
							}
						}
				});		
			
				var form = this.loginPanel.getForm();
			
				this.layout = "border";
				this.items = [
					this.loginPanel
				];
			
				LoginWindow.superclass.initComponent.call(this);
	}
});

Ext.onReady(function () {
	var loginwindow = new LoginWindow();
	loginwindow.show();
	
	if (error != '') {
		document.getElementById('errorMsgText').innerHTML = error;
	}
});