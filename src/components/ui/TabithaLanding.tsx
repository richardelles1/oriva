import Image from 'next/image'
import tabithaJump from '/public/tabitha_jump.png'

export default function TabithaLanding({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src={tabithaJump}
        alt="Tabitha Rabbit jumping"
        width={200}
        height={200}
        priority
      />
    </div>
  )
}
