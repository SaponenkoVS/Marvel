

class MarvelService{
    _apiKey = '&apikey=6757f3b83bb2f5c25f183fc3652cc4af'
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    getResourse=async (url)=>{
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status})`);
        }
        return await res.json();
    }


    getAllCharecters =async()=>{
        let res = await this.getResourse(`${this._apiBase}?limit=9&offset=210${this._apiKey}`
        );
           return  res.data.results.map(this._transformCharacter);
    }
     
    
        getCharecter = async(id)=>{
            let res = await this.getResourse(`${this._apiBase}/${id}?${this._apiKey}`
            );
            return this._transformCharacter(res.data.results[0]);
        }

    _transformCharacter = (char)=>{
        return {
            id: char.id,
            name : char.name,
            description:char.description || 'Sorry,but description is not founded' ,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url
    }
    }
}
export default MarvelService;


