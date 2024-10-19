const latestPostCardContainer = document.getElementById('latest-post-card-container');

// bringing latest posts from api
const loadPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
}
loadPost();

// showing the data in the ui/ cards
const displayPosts = posts => {
    posts.forEach(post => {
        // adding the data inside the card
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = (`flex bg-[#F3F3F5] hover:bg-[#797DFC1A] border-2 hover:border-[#797DFC] rounded-2xl p-4 gap-3`);
        latestPostCard.innerHTML = `
                        <div>
                            <div class="bg-white w-16 h-16 rounded-2xl relative">
                                <div class="${post.isActive ? 'bg-green-600' : 'bg-red-600'} w-2 h-2 rounded-full p-1 absolute right-0 -top-1">
                                </div>
                                <img class="rounded-2xl" src="${post.image}" alt="">
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="flex gap-3 text-sm">
                                <p># <span>${post.category}</span></p>
                                <p>Author : <span>${post.author.name}</span></p>
                            </div>
                            <div class="border-b-2 border-dashed space-y-2 pb-4">
                                <p class="font-bold text-lg">${post.title}</p>
                                <p>${post.description}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                    <i class="fa-regular fa-message"></i> <span class="mr-2">${post.comment_count}</span>
                                    <i class="fa-regular fa-eye"></i> <span class="mr-2">${post.view_count}</span>
                                    <i class="fa-regular fa-clock"></i> <span>${post.posted_time} min</span>
                                </div>
                                <div onclick = "handleMark('${post.title}',${post.view_count})" class="w-7 h-7 rounded-full bg-[#10B981] text-white text-center">
                                    <i class="fa-regular fa-envelope-open text-lg"></i>
                                </div>
                            </div>
                        </div>
        `;
        latestPostCardContainer.appendChild(latestPostCard);
    });

}


// showing new  post
const loadNewPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const dataNewPost = await res.json();
    displayNewPost(dataNewPost);
}
loadNewPost();

const newPostContainer = document.getElementById('new-post-container');

const displayNewPost = posts => {
    posts.forEach(post => {
        const newPostCard = document.createElement('div');
        newPostCard.classList = `card bg-base-100 border`;
        newPostCard.innerHTML = `
        <figure class="px-10 pt-10">
                    <img src="${post.cover_image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="px-12 py-6 items-center text-left space-y-6">
                    <p><i class="fa-regular fa-calendar"></i> ${post.author.posted_date || 'No published date'}</p>
                    <h2 class="card-title font-extrabold">${post.title}</h2>
                    <p>${post.description}</p>
                    <div class="flex items-center gap-3">
                        <div>
                            <img class="w-11 h-11 rounded-full" src="${post.profile_image}" alt="">
                        </div>
                        <div>
                            <p>${post.author.name}</p>
                            <p>${post.author.designation || 'Unknown'}</p>
                        </div>
                    </div>
                </div>
        `;
        newPostContainer.appendChild(newPostCard);
    })
}


// adding mark as read
const mark_as_read = document.getElementById('markAsRead');
function handleMark(title, viewcount) {
    const markAsReadCard = document.createElement('div');
    markAsReadCard.classList = `bg-white flex justify-between gap-3 items-center p-2 rounded-2xl`
    markAsReadCard.innerHTML = `
        <p>${title}</p>
        <p><i class="fa-regular fa-eye"></i> ${viewcount}</p>
    `;
    mark_as_read.appendChild(markAsReadCard);
}


