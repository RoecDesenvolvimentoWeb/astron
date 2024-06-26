import { ReactElement } from "react";

interface IMolBiggestSalesMonthProps {
    month: string
    salesCount: number
}

export const MolBiggestSalesMonthCard = (props: IMolBiggestSalesMonthProps): ReactElement => {
    return (
        <>
            <div className="w-full md:w-fit min-w-[182px] md:max-w-[182px] h-[196px] bg-white rounded-lg">
                <div className="flex justify-center">
                    <svg width="68" height="67" viewBox="0 0 68 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.5884 16.1794L25.2266 13.2665C25.2366 13.5386 25.2453 13.8543 25.2565 14.2199C25.3107 16.0861 25.4027 19.7456 25.5543 26.9192C25.5637 27.3771 25.589 27.8184 25.6214 28.243C25.6313 28.3698 25.6455 28.4908 25.6574 28.6155C25.6961 29.0374 25.7502 29.4578 25.8194 29.8758C25.8676 30.1612 25.9221 30.4387 25.9821 30.7084L26.0487 31.0043C26.1348 31.3549 26.2311 31.6943 26.3409 32.0167L26.3461 32.033C26.4635 32.377 26.5982 32.7143 26.7514 33.0443L26.7663 33.0746C26.9024 33.3635 27.0543 33.6454 27.2201 33.9176L27.3014 34.0449C27.4509 34.281 27.6125 34.5086 27.7862 34.7279C27.814 34.7629 27.8416 34.7994 27.8704 34.8338C29.2465 36.4293 31.1609 37.4634 33.2496 37.7397C34.0242 37.88 34.8121 37.9367 35.5989 37.9079C38.7237 31.0244 40.745 23.6917 41.5884 16.1794Z" fill="#B468C2"/>
                        <path d="M41.5884 16.1794C40.7451 23.6909 38.7243 31.0228 35.6001 37.9057C39.4467 37.7568 42.2239 35.2437 44.2254 30.1386C46.3918 24.6131 47.9484 20.6756 48.8528 18.4362C48.9953 18.0914 49.1133 17.7934 49.2197 17.538L41.5884 16.1794Z" fill="#E2D9E7"/>
                        <path d="M28.1978 45.0496L25.1528 44.5075L24.1489 50.1466L32.77 51.6814L33.774 46.0423L28.1978 45.0496Z" fill="#B468C2"/>
                        <path d="M38.0031 46.7952L33.7739 46.0423L32.77 51.6814L36.9991 52.4343L38.0031 46.7952Z" fill="#E2D9E7"/>
                        <path d="M35.0169 27.7946C36.7551 28.104 38.415 26.9458 38.7244 25.2076C39.0339 23.4694 37.8757 21.8095 36.1375 21.5C34.3993 21.1906 32.7394 22.3488 32.4299 24.087C32.1205 25.8252 33.2787 27.4851 35.0169 27.7946Z" fill="#E2D9E7"/>
                        <path d="M24.3878 28.2547C24.3878 28.2547 24.4873 28.0606 20.6735 24.4049C18.9194 22.7264 16.9238 20.5715 17.3501 18.1772C17.7763 15.7829 20.0329 14.5068 22.4248 14.9326L23.6145 15.1444M44.5428 32.0759C44.5428 32.0759 44.6423 31.8817 49.4834 29.7669C51.7075 28.7967 54.3887 27.4744 54.815 25.0801C54.9102 24.5288 54.8919 23.9639 54.7613 23.4199C54.6307 22.8759 54.3905 22.3643 54.0554 21.9164C53.7202 21.4684 53.2972 21.0936 52.8123 20.8147C52.3273 20.5359 51.7905 20.3589 51.2347 20.2946L49.5392 19.9928M50.3454 16.9275C50.3454 16.9275 50.4181 16.5191 44.9649 30.4301C42.6029 36.4566 38.8763 39.5515 33.1066 38.5243C27.3369 37.4972 24.8892 33.4085 24.7524 26.9364C24.4352 11.9981 24.3806 12.3049 24.3806 12.3049L50.3454 16.9275ZM24.5055 43.5796L38.9302 46.1477L37.6461 53.3604L23.2215 50.7924L24.5055 43.5796Z" stroke="#32063D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M34.8766 28.5814C37.0493 28.9682 39.1242 27.5204 39.511 25.3477C39.8978 23.175 38.4501 21.1 36.2773 20.7132C34.1046 20.3264 32.0297 21.7742 31.6429 23.9469C31.2561 26.1196 32.7038 28.1946 34.8766 28.5814Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M31.9699 44.9085L33.1064 38.5243" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight text-center">{props.month}</div>
                    <div className="text-neutral-600 text-[32px] font-medium font-['Geologica'] leading-[44.80px]">$ {props.salesCount.toFixed(2)}</div>
                    <div className="w-[161px] text-center text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight">Seu mês de maior faturamento</div>
                </div>
            </div>
        </>
    )
}