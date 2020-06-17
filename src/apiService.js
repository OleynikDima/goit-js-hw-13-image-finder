//16841256-a77ab01fa9b5f4c89d3e82996


// export default searchServise;
//https://pixabay.com/api
//?image_type=photo
//&orientation=horizontal
//&q=что_искать
//&page=номер_страницы
//&per_page=12
//&key=твой_ключ

const baseUrl = 'https://pixabay.com/api/';

export default {
    page:1,
    query:'',
    fetchArticles() {
        const options = {
            headers: {
                Authorization:'16841256-a77ab01fa9b5f4c89d3e82996',
                     },
                 };

    const myKey  = '16841256-a77ab01fa9b5f4c89d3e82996'
    const paramtr = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=3&key=`;
    


    return fetch(baseUrl + paramtr + myKey)
       .then(res => res.json())
       .then(data => {
         this.incrementPage()
           return data.hits;
        })
       .catch(error => console.error(error));
    },
    get searchQuery(){
        return this.query;
    },
    set searchQuery(string){
        this.query = string;
    },
    incrementPage(){
        this.page += 1;
    },
    resetPage(){
        this.page = 1;
    }

}