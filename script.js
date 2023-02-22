// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function createCalender() {
  var table = document.createElement("table");
  table.setAttribute("id", "myTable");

  var tr = document.createElement("tr");
  for (let i = 0; i < days.length; i++) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(days[i]));
    tr.appendChild(th);
  }
  table.appendChild(tr);
  document.getElementsByClassName("setTable")[0].appendChild(table);

  var fday = document.getElementById("startDate").value;
  var nday = document.getElementById("numberDays").value;

  if (nday < 28 || nday > 31) {
    alert("Days cannot be less than 28 and greater than 31 !!!");
    return;
  }
  var no = "";
  var first = 1;
  var newtr = document.createElement("tr");

  for (let i = 0; i < days.length; i++) {
    /*for(let j=1;j<=nday;j++)
            {
                console.log('object');
            }*/

    console.log(days[i]);

    if (days[i] == fday) {
      console.log("match");
      //var td = document.createElement('td');

      var k = i;
      while (first <= nday) {
        var td = document.createElement("td");

        td.appendChild(document.createTextNode(first));

        if (k > 6) {
          newtr = document.createElement("tr");
          k = 0;
        }
        console.log("weekday=", k);
        console.log("day=", first);

        if (k == 6 || k == 0) {
          td.setAttribute("style", "color:red;");
        }
        td.setAttribute("id", first);
        td.setAttribute("onclick", "task(event)");
        td.setAttribute("onmouseover", "showTask(event)");
        newtr.appendChild(td);
        table.appendChild(newtr);
        first++;
        k++;
      }
    } else {
      console.log("no match");
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(no));
      newtr.appendChild(td);
    }
  }
  table.appendChild(newtr);
  document.getElementsByClassName("setTable")[0].appendChild(table);

  document.getElementById("createBtn").disabled = true;
}

function task(event) {
  modal.style.display = "block";
  console.log(event.target.id);

  document.getElementById("date").value = event.target.id;
  document.getElementById("date").disabled = true;
}

function cancel() {
  modal.style.display = "none";
}

var data = {};

function addTask(event) {
  var date = document.getElementById("date").value;
  var name = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var priority = document.getElementById("priority").value;

  if (Object.keys(data).includes(date)) {
    data[date].push({ name: name, desc: description, priority: priority });
  } else {
    var arr = [];

    arr.push({ name: name, desc: description, priority: priority });

    data[date] = arr;
  }

  /*var temp = 0;

        Object.keys(data).forEach(key => {
            if(key == date)
            {
                temp = 1;
            }
        })

        if(temp == 0)
        {
            arr = [];
            arr.push({name:name,desc:description,priority:priority});
            
        }
        else if(temp == 1 )
        {
            arr.push({name:name,desc:description,priority:priority});
        }*/

  console.log(data);

  document.getElementById(date).style.backgroundColor = "rgb(98, 98, 255)";
}

function showTask(event) {
  document.getElementById("showTask").innerHTML = "";
  Object.keys(data).forEach((key) => {
    if (key == event.target.id) {
      console.log(data[key]);
      var str = "";
      var divColor = "";
      data[key].forEach((item) => {
        if (item.priority == "Low") {
          divColor = "rgb(202, 200, 200)";
        } else if (item.priority == "Medium") {
          divColor = "rgb(255, 255, 103)";
        } else if (item.priority == "High") {
          divColor = "rgb(78, 255, 78)";
        }
        str =
          "<div class='setTask' style='background-color:" +
          divColor +
          ";'>" +
          "<h3>" +
          item.name +
          "</h3>" +
          "<h5>" +
          item.desc +
          "</h5>" +
          "</div>";

        document.getElementById("showTask").innerHTML += str;
      });
    }
  });
}
