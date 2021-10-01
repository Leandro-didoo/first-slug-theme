import { ChevronCircleLeft } from '../../components/Icons';
import style from './style.module.scss';
import Link from 'next/link'
import { useRouter } from 'next/router';
import cms from '../../services/cms';
import { GetStaticProps } from 'next';
import { PageData } from '../../types/typesdef';



type Props = {
    privacityPolicy:{
        content: string
    }
}

export default function PrivacyPolicy({privacityPolicy}:Props ) {
    const router = useRouter()
    return (
        <div className={style.container}>
            <div className="container">
                <div className="row">
                    <div className="col s12">

                        <div className={style.topPage}>
                           
                                <a onClick={() => router.back()}>
                                    <ChevronCircleLeft width={30} color="#333" />
                                </a>
                         
                            <h1>Política de privacidade</h1>
                        </div>

                        <div dangerouslySetInnerHTML={{
                            __html: `${privacityPolicy.content} ` }} />

                    </div>
                </div>

            </div>

        </div>
    )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const theme_slug = process.env.THEME_SLUG;
    const access_token = process.env.USER_ACCESS_TOKEN;
  
    const response = await cms.get(`page/data/${theme_slug}`, {
      headers: { 'access-token': access_token }
    });
  
    if (!response || !response.data.result) throw new Error('Impossível carregar a página.');
    const page = response.data.response;
    // END:: REQUEST PAGE | BEGIN:: PARSE PAGE
    const page_data = page.datas[0] as PageData;
  
    let parseElement = {} as any;
    page.elements.forEach((element: { class_name: string, datas: any[] }) => {
      let tempData = element.datas[0] ?? null;
      if (tempData) {
        tempData.data = JSON.parse(tempData.data);
      }
      parseElement[element.class_name] = tempData;
    });
  
    const elements = parseElement;

    const privacityPolicy = elements.privacity_policy.data;
 return{
     props:{
        privacityPolicy,

     }
 }
}