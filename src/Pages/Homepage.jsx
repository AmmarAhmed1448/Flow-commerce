import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
// import Carousel from '../Components/Carousel';

function Homepage(){
    return(
        <>
        <Navbar />
        {/* <Carousel /> */}
        <div className='flex justify-center flex-wrap gap-4 py-8'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
        </>
    )
}


export default Homepage;