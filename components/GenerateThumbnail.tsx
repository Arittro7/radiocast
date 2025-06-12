import { Button } from './ui/button'

const GenerateThumbnail = () => {
  return (
    <>
    <div className='generate_thumbnail'>
      <Button
        type='button'
        variant='plain'
        className='bg-orange-600 cursor-pointer'
      >
        Use AI to Generate Thumbnail
      </Button>
      <Button
        type='button'
        variant='plain'
        className='bg-orange-600 cursor-pointer'
      >
        Upload Custom Image 
      </Button>
    </div>
    </>
  )
}

export default GenerateThumbnail