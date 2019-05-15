//闭包是拥有许多变量且绑定了这些变量的环境表达式。内部函数拥有对其所在作用域的引用，该引用被称为闭包。

var name = "The Window";   
var object = {
	name : "My Object",
	getNameFunc : function(){
		return function(){//该返回值返回函数，返回到object对象；
			return this.name;//该返回值返回给object对象的包含元素
		};
	}   
};   
alert(object.getNameFunc()()); //结果为The Window


//⬇️全局变量和局部变量
var a=5;
function out(){
	a=0;
	console.log("函数内部a的值:"+a);//函数内部a的值:0
}
out();
var a=4;
console.log("在函数外部调用a的值:"+a);//在函数外部调用a的值:4
/*如果函数内部没有加关键词var，那么函数内的变量自动成为全局变量，
它将改变外部上面那个同名全局变量的值。所以在定义函数局部变量时都要加上var关键词*/


//⬇️每隔一秒输出一个数，数值为[1-5]，每次加1⬇
for (let i = 1; i <= 5; i++) {
	setTimeout(function(){
		console.log(i);
	},i*1000);
}
// 将for循环中的i变量用let声明绑定在其所在作用域中，创建块作用于。let关键字使用在for循环头部时
// 有一个特殊行为，该行为指出for循环中每一次迭代，变量都会被重新声明。所以可以用以下方法实现目标。
// 重点在于：1⃣️创建块作用域；2⃣️封闭在循环内部，使得每一次循环都产生一个全新的作用域


//⬇️通过在模块实例的内部保留对公共API的引用，可以从内部对模块实例进行修改。
var foo=(function coolModule(id){//将一个封闭函数的IIFE形式赋予给变量foo
	function change(){//内部函数change
		publicAPI.identify = identify2;
	}
	function identify1(){//内部函数identify1后台输出id
		console.log(id);
	}
	function identify2(){//内部函数identify2后代输出id大写格式
		console.log(id.toUpperCase());
	}
	var publicAPI={//拥有change方法和identify方法的对象publicAPI
		change:change,
		identify:identify1,
	}
	return publicAPI;//返回该对象
})("foo Module");//传入参数“foo Module”
foo.identify();//调用封闭函数的identify方法，输出id
foo.change();//调用封闭函数的change方法，更改id，此次调用只有操作，没有后台输出值
foo.identify();//再次调用封闭函数的identify方法，返回修改都的id
