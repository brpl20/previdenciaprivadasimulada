import PrevCalculator from '../components/PrevCalculator';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import '../app/globals.css'

export default function Home() {

  const positionColorRelation = {
    // exemplo de valores
    home: '#FFF',
    sobre: '#EEE',
    contato: '#DDD',
  };
  return (
    <>
      <Header positionColorRelation={positionColorRelation} />
      <PrevCalculator />;
      <Footer />
    </>
  )
}
