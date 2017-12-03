var app = angular.module("todo",[]);
app.factory("todosave",function(){
	return {
		getData:function(){
			return JSON.parse(localStorage.getItem("todos")||"[]")
		},
		saveData:function(data){
			localStorage.setItem("todos",JSON.stringify(data))
		}
	}
})


app.controller("todo-ctrl",function($scope,todosave){
	//数据
	$scope.todos = todosave.getData();

	$scope.$watch("todos",function(newVal,oldVal){
		todosave.saveData(newVal)
	},true)
	//当前显示分类下标
	$scope.idx = 0; 
	//修改 显示分类
	$scope.changeIndex = function(i){
		$scope.idx = i;
	}

	//添加分类 
	$scope.addShow = false;
	$scope.addTitle = ""; 
	//编辑分类
	$scope.editShow = false;
	$scope.editTitle = ""
	$scope.edit = function(){
		$scope.editShow = true;
		$scope.editTitle = $scope.todos[$scope.idx].title;
	}
	$scope.editcancel = function(){
		$scope.editShow = false;
	}
	$scope.editdone = function(){
		$scope.todos[$scope.idx].title = $scope.editTitle;
		$scope.editShow = false;
	}

	//按钮组 事件
	$scope.cancel = function(){
		$scope.addShow = false;
	}

	$scope.done = function(){	
		var tid = $scope.todos.length?$scope.todos[$scope.todos.length-1].tid+1:1;
		$scope.todos.push({
			tid:tid,
			title:$scope.addTitle,
			todo:[]
		})
		$scope.addShow = false;
		$scope.addTitle = "";
		$scope.idx = $scope.todos.length-1;
	}


	//todolist 显示隐藏
	$scope.doingShow = true;
	$scope.doingShowFn = function(){
		$scope.doingShow = !$scope.doingShow;
	}
	$scope.doneShow = false;
	$scope.doneShowFn = function(){
		$scope.doneShow = !$scope.doneShow;
	}


	//修改todo的标题
	$scope.changeTodoTitle = function(ev,o){
		o.title = ev.srcElement.innerHTML
		console.log($scope.todos)
	}


	//添加todo
	$scope.addTodo = function(){
		var td = $scope.todos[$scope.idx].todo;
		var id = td.length?td[td.length-1].id+1:1;
		td.push({
			"id":id,
			"title":"",
			"done":false
		})
	}

	//删除todo
	$scope.delTodo = function(did){
		var td = $scope.todos[$scope.idx].todo;
		td.forEach(function(val,index){
			if(val.id == did){
				td.splice(index,1);
			}
		})
	}
})