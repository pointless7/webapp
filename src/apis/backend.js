var firebaseConfig = {
    apiKey: "AIzaSyCZ-jrxWd5yTOGg668RxQNpQN8oAjjsiy0",
    authDomain: "rman-aed17.firebaseapp.com",
    databaseURL: "https://rman-aed17.firebaseio.com",
    projectId: "rman-aed17",
    storageBucket: "rman-aed17.appspot.com",
    messagingSenderId: "211600477588",
    appId: "1:211600477588:web:8de0676ef720d28bb55381",
    measurementId: "G-S3Q1KZN6LJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();
  document.onload = getNameOfCollection();


function getData(){
      var post_content = document.getElementById("post-content").value;
      console.log(post_content)
        add(post_content);
  }


function getNameOfCollection(){
    var head = document.getElementById("heading").innerHTML;
    if(head=="Volunteer"){col_name = "volunteer_posts";}
    else if(head=="Food Donation"){col_name = "food_donation_posts";}
    else if(head=="Complaints"){col_name = "complaints_posts";}
    else if(head=="Ration Distribution"){col_name = "ration_distribution_posts";}
    getAllThePost(col_name);

}

function add(content){
    db.collection(col_name).add({
        post_content: String(content)
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


function getAllThePost(col){
    var posts_container = document.getElementById("post-container");
    var text = "";
    db.collection(String(col)).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data());
            text = doc.data().post_content;
            var li = document.createElement("li");
            li.className = "collection-item";
            li.innerHTML = '<h6 class="flow-text">'+text+'</h6>';
            posts_container.appendChild(li);
            console.log(text.post_content);
            console.log(doc.id, " => ", doc.data());
        });
    });
}

