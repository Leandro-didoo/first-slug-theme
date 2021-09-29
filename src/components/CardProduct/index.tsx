import style from './style.module.scss';
type Product = {
    id: number
    img: string,
    name: string
    price: number,
}

type Props = {
    product: Product
}
export const CardProdutct = ({product}:Props) =>{
    return(
        <div className={style.container}>
          <div className={style.img}
          style={{backgroundImage: `url(${product.img})`}}
          >
            
          </div>
          <div className={style.info}>
              <p>{product.name}</p>
              <span>valor a Pártir de <strong>{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong></span>
          </div>
        </div>
    )
}