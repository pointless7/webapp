
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed == true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      if (completedTodos == totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    if (addTodoTextInput.value == "") {
      return;
    } else {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = "";
      view.displayTodos();
      view.storeLocally();
    }
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(liId) {
    todoList.deleteTodo(liId);
    view.displayTodos();
  },
  toggleCompleted: function(liId) {
    // var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    // todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    // toggleCompletedPositionInput.value = '';
    todoList.toggleCompleted(liId);
    view.displayTodos();
  },
  toggleAll: function() {
    if (todoList.todos.length === 0) {
      return;
    } else {
      todoList.toggleAll();
      view.displayTodos();
    }
  },
  deleteAll: function() {
    todoList.todos = [];
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    if (todoList.todos.length == 0) {
      todosUl.innerHTML =
        "<i class='a'>Fantastic, no work to do! <i class='far fa-thumbs-up'></i></i>";
    }

    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = todo.todoText;

      if (todo.completed === true) {
        // todoTextWithCompletion = '(x) ' + todo.todoText;
        todoLi.style.setProperty("text-decoration", "line-through");
      }
      //  else {
      //   todoTextWithCompletion = '( ) ' + todo.todoText;
      // }

      todoLi.innerHTML =
        '<button class="toggleButton"></button><span>' +
        todoTextWithCompletion +
        '</span><button class="deleteButton"></button>';
      todoLi.id = position;
      // todoLi.textContent = todoTextWithCompletion;

      // var toggleButton= document.createElement('button');
      // toggleButton.textContent='Toggle';
      // toggleButton.className='toggleButton';
      // todoLi.appendChild(toggleButton);

      // todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);

    localStorage.setItem("todosLeft", JSON.stringify(todoList.todos));
  },

  // createDeleteButton: function(){
  //   var deleteButton= document.createElement('button');
  //   deleteButton.textContent='';
  //   deleteButton.className='deleteButton';
  //   return deleteButton;
  // },

  setUpEventListeners: function() {
    var input = document.getElementById("addTodoTextInput");
    input.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        handlers.addTodo();
      }
    });

    var todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function(event) {
      var elementClicked = event.target;
      if (event.target.className === "deleteButton") {
        handlers.deleteTodo(elementClicked.parentNode.id);
      } else if (event.target.className === "toggleButton") {
        handlers.toggleCompleted(elementClicked.parentNode.id);
      }
    });
  }
};

todoList.todos = JSON.parse(localStorage.getItem("todosLeft") || "[]");
view.displayTodos();

view.setUpEventListeners();
