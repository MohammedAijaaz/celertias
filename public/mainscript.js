var i = 0;

function postArticle() {
    var database = firebase.database();
    var post = database.ref('posts/' + i);
    post.set({
        title: "My Article",
        content: "This is my first article ever i am super excited i have no freaking idea what i am writing right now :p",
        author: "Mohammed Aijaaz"
    });
    i++;
    console.log("done");
}
window.onload = function() {
    console.log("starting..");
    var $list = $('#list');
    var database = firebase.database().ref('posts');
    database.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var v = childSnapshot.val();
            // console.log(childSnapshot.key);
            $list.prepend(

                '<div class="col-sm-4">' +
                '<div class="panel panel-default">' +
                '<div class="panel-heading" onclick="display(' + childSnapshot.key + ')">' +
                v.title + '</div>' +
                '<div class="panel-body" onclick="display(' + childSnapshot.key + ')">' +
                v.content.substr(0, 55) + "... <span style='color:green '>Click to read more</span>" +
                '</div>' +
                '<div class="panel-footer">' +
                '- ' + v.author +
                '</div>' +
                '</div>'
            );

        });
        document.getElementById('loading').style.display = 'none';
    });
    console.log("Done loading!!");
}

function display(id) {
    var ref = firebase.database().ref("posts/" + id);
    ref.on('value', function(snapshot) {
        var v = snapshot.val();
        document.getElementById("modalTitle").innerHTML = v.title;
        document.getElementById("modalBody").innerHTML = v.content;
        document.getElementById("modalFooter").innerHTML = "- " + v.author;
        $("#myModal").modal();
    });

}

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("mine");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}