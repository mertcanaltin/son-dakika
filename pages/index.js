import TimeLine from "@/components/timeLine"
import AlertElement from "@/components/alert"

export default function Home() {
  return (
    <div className="container mx-auto mt-10">
      <AlertElement/>
      <div className="p-20  ">
        <TimeLine />
      </div>
      
    </div>
  )
}
