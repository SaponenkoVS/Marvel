import './charList.scss';
import MarvelService from '../../servises/MarvelService';
import{useState, useEffect, useRef} from 'react';
import ErrorMessege from '../errorMessege/errorMessege';
import Spinner from '../spinner/Spinner';


let CharList =(props)=>{
 
    let [charList,setCharlist]=useState([]);
    let [loading,setloading]=useState(true);
    let [Error,setError]=useState(false);
    let [newItemLoading,setNewItemLoading]=useState(false);
    let [offset,setOffset]=useState(210);
    let [charEnded,setCharEnded]=useState(false);
    

   let marvelService = new MarvelService();


   useEffect(()=>{
    onRequest();
   },[]);

   
    let onRequest =(offset)=>{
       onCharListLoading()
       marvelService.getAllCharecters(offset)
       .then(onCharListLoaded)
       .catch(onError)
    }
    
   let onCharListLoading =()=>{
        setNewItemLoading(true);
        }

   let onCharListLoaded=(newCharList)=>{
    let ended=false;
    if(newCharList.length<9){
        return ended=true;
    }
    setCharlist(charList=>[...charList,...newCharList])
    setloading(loading=>false)
    setError(Error=>false)
    setNewItemLoading(newItemLoading=>false)
    setOffset(offset=> offset+9)
    setCharEnded(charEnded=>ended)
   }

   let onError=()=>{
    setloading(loading=>false)
    setError(Error=>true)
    }
  

    let itemRefs =useRef([]);



    let focusOnItem =(id)=>{
        itemRefs.current.forEach(item=>item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

   function renderItems(arr){
    const items = arr.map((item,i)=>{
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};}

            return(
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i]=el}
                    key={item.id}
                    onClick={()=>{
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}>
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
    
        let items = renderItems(charList);
        
        const errorMessage = Error ? <ErrorMessege/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || Error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={()=>{
                    onRequest(offset)
                }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


export default CharList;



