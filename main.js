var tasks = [];
var draft = [];
loadpage();


  if (!localStorage.pageLoadCount)
    localStorage.pageLoadCount = 0;
  localStorage.pageLoadCount = parseInt(localStorage.pageLoadCount) + 1;
  

function addNewTask(newTask, taskDoDate) {
            var note_container = document.querySelector('.note_container');
            var closeButton = document.createElement('button');
            closeButton.textContent = "✖";
            closeButton.classList.add('delete');
            
            closeButton.addEventListener('click', function(e) {
                var n = e.target.parentNode;
                tasks.splice(tasks.length-1 - (".note").index(n), 1);
                var jsonTasks = JSON.stringify(tasks);
                localStorage.setItem("tasks", jsonTasks);
                
                n.parentNode.removeChild(n);
                console.log (localStorage);
            });

            var noteContent = document.createElement('div');
            noteContent.classList.add('noteContent');
            var task = document.createElement('span');
            task.classList.add('task');
            task.textContent = newTask;
            noteContent.appendChild(task);
            var date = document.createElement('div');
            date.classList.add('date');
            date.textContent = taskDoDate;
            noteContent.appendChild(date);

            var note = document.createElement('div');
            note.classList.add('note');
            
            
            note.appendChild(closeButton);
            note.appendChild(noteContent);
            
            (".note_container").prepend(note);
            console.log (localStorage);
}

function addNewTask_old(keys) {
    var note_container = document.querySelector('.note_container');
    var closeButton = document.createElement('button');
    closeButton.textContent = "✖";
    closeButton.classList.add('delete');

    var note = document.createElement('div');
    note.classList.add('note');
    note.classList.add('fade-out');

    var noteContent = document.createElement('div');
    noteContent.classList.add('noteContent');

    var task = document.createElement('span');
    task.classList.add('task');
    task.textContent = keys[0].newTask;
    noteContent.appendChild(task);

    var date = document.createElement('div');
    date.classList.add('date');
    date.textContent = keys[0].taskDoDate;
    noteContent.appendChild(date);

    
    note.appendChild(closeButton);
    note.appendChild(noteContent);
    note_container.appendChild(note);
    note_container.insertBefore(note, note_container.childNodes[0]);
}


document.querySelector('form').addEventListener('submit', function(e) { 
    var form = document.querySelector('form');
    var newTask = form.querySelector('textarea').value;
    var taskDoDate = form.querySelector('input[type="date"]').value;
    if (localStorage.getItem('tasks') !== null){
        tasks = JSON.parse(localStorage.getItem('tasks'));       
    }
    
    tasks.push({
        newTask: newTask,
        taskDoDate: taskDoDate,
    });
 
    addNewTask(newTask, taskDoDate);
    var jsonTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonTasks);
    setForm();
    e.preventDefault();
    return false;
});


 
function saveDraft(Draft, selector,TaskJsonDraft){ 
    var form = document.querySelector('form');
    var Draft = form.querySelector(selector).value;
    var jsonDraft = JSON.stringify(Draft);
    localStorage.setItem(TaskJsonDraft, jsonDraft);
}

function loadpage()
{
    var form = document.querySelector('form');
    var t = JSON.parse(localStorage.getItem('newDraft'));


    t = localStorage.getItem('tasks');
    if ( t !== null) {
        
        tasks = JSON.parse(localStorage.getItem('tasks'));

        for (var i = 0; i < tasks.length; i++)
            addNewTask(tasks[i].newTask, tasks[i].taskDoDate);
    }
}


function loadDraft(newDraft, selector) { 
    var form = document.querySelector('form');
    if (localStorage.getItem(newDraft) !== null) {
        var newDraft = JSON.parse(localStorage.getItem(newDraft));
        form.querySelector(selector).value = newDraft;
    }
}


function setForm() { 
    var form = document.querySelector('form');
    form.querySelector('textarea').value = "";
}


