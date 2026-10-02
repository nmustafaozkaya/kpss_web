from pathlib import Path
import json
from PIL import Image

work=Path('tmp/pdfs/turkce')
jobs=[]
for page in range(5,205):
    im=Image.open(work/f'p{page:03}.png').convert('L')
    w,h=im.size
    # Locate the book's vertical column separator rather than assuming equal margins.
    candidates=range(int(w*.47),int(w*.54))
    divider=max(candidates,key=lambda x:sum(im.getpixel((x,y))<110 for y in range(int(h*.15),int(h*.90))))
    for col,(left,right) in enumerate([(int(w*.018),divider-5),(divider+8,w-5)]):
        name=f'd{page:03}_{col}'
        image=im.crop((left,int(h*.061),right,int(h*.945)))
        image.resize((image.width*2,image.height*2)).save(work/(name+'.png'))
        jobs.append(name)
(work/'revised-jobs.json').write_text(json.dumps(jobs))
