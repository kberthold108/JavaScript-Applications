export const ideaTemplate = (idea) => {
    return `<div class="card overflow-hidden current-card details mb-3" style="width: 17rem; height: auto" id=${idea._id} >

                <p class="card-text">${idea.title}</p>
               
                <img src=${idea.img} class="card-img-top " style="width: 80%; height: 50%" >
                <a class="btn btn-secondary mb-3" name="ideaDetail">Details</a>
            </div>`;
};