const container = document.getElementById("posts");
const windowElem = document.getElementsByClassName("window")[0];

// 1- Fetch the posts API
const loadPosts = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts.json().then(async (post) => {
    post.forEach(async (one) => {
      // 2- Fetch the images
      const img = await fetch("https://picsum.photos/1920");
      const blob = await img.blob();
      const imgURL = URL.createObjectURL(blob);
      // J'ai pas aimé cette solution il y a une phase de non stabilité lors du chargement
      // utilises donc importNode()
      container.innerHTML += `
        <div class='card col-sm-6 col-md-4 col-lg-3 px-0' onclick="showWindow('${imgURL}')">
          <img src='${imgURL}' class='card-img-top'>
          <div class='card-body'>
            <h3 class='card-title mb-4'>${one.title}</h3>
            <p class='card-text'>${one.body}</p>
          </div>
        </div>
      `;
    });
  });
};

loadPosts();
document.getElementsByClassName("card");

// Show the window
const showWindow = (url) => {
  // html, body {margin: 0; height: 100%; overflow: hidden}
  // Add it when it shows up
  console.log(url);
  const windowHTML = `<div class="window">
  <img src="${url}" width="600">
  <div class="close-btn" onclick='closeWindow()'>&times;</div>
</div>`;

  document.body.innerHTML += windowHTML;
  console.log("How are u");
};

const closeWindow = () => {
  // document.getElementsByClassName("window")[0].style.display = "none";
  document.getElementsByClassName("window")[0].remove();
};
