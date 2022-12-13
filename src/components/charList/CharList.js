import './charList.scss';
import MarvelService from '../../servises/MarvelService';
import { Component } from 'react/cjs/react.development';
import ErrorMessege from '../errorMessege/errorMessege';
import Spinner from '../spinner/Spinner';


class CharList extends Component{

    state={
     charList:[],
     loading: true,
     Error: false
    }

   marvelService = new MarvelService();

   componentDidMount(){
    this.onLoading();
    this.marvelService
    .getAllCharecters()
    .then(this.onCharListLoaded)
    .catch(this.onError)
    }
   

   onCharListLoaded=(charList)=>{
    this.setState({
        charList,
        loading:false,
        error: false
    })
   }

   onError=()=>{
    this.setState({
        Error: true,
        loading: false
    })
   }

   onLoading=()=>{
    this.setState({
        loading : true,
    }) 
     
}

   renderItems(arr){
    const items = arr.map((item)=>{
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};}

            return(
                <li 
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
            });
                
            return (
                <ul className="char__grid">
                    {items}
                </ul>
            )
        
            }
    
    render(){
        let {charList,loading,error} = this.state;
        let items = this.renderItems(charList);
        
        const errorMessage = error ? <ErrorMessege/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;



