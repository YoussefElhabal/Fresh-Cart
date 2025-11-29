import notFound from '../../assets/images/error.svg';

export default function Notfound() {
    return (
        <div className='container mx-auto my-10 px-5 h-[70vh] flex justify-center items-center'>
            <img src={notFound} alt="Not Found" />
        </div>
    )
}