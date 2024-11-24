import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Author, Idea } from "@/sanity/types"

export type IdeaTypeCard = Omit<Idea, "author"> & { author?: Author }

const IdeaCard = ({ post }: { post: IdeaTypeCard }) => {
  const {_createdAt, views, author , _id , description , image, category,title} = post;

  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
              <EyeIcon className="size-6 text-primary" />
              <span className="text-16-medium">{views}</span>
            </div>
        </div>
        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`/project/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{title}</h3>
            </Link>
          </div>
          <Link href={`/user/${author?._id}`}>
            <Image src="https://placeholder.com/48x48" alt="placeholder" width={48} height={48} className="rounded-full" />
          </Link>
        </div>
        <Link href={`/project/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/project/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default IdeaCard