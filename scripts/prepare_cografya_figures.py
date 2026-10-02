import cv2,json
from pathlib import Path
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/'tmp/pdfs/yargi-cografya'
OUT=ROOT/'tmp/geo-audit/figures';OUT.mkdir(exist_ok=True)
candidates=json.loads((ROOT/'scripts/cografya-review/candidates.json').read_text(encoding='utf8'))
candidates['cogr_d28_q11']['end']=1200
candidates['cogr_d28_q12']={'page':144,'side':'R','y':1230,'end':1687}
candidates['cogr_d33_q6']={'page':168,'side':'R','y':1155,'end':1687}
found={}
for id,c in candidates.items():
    im=Image.open(WORK/f"p{c['page']:03}{c['side']}.png").convert('RGB')
    crop=im.crop((0,max(0,c['y']-8),im.width,c['end']-5))
    crop.save(OUT/(id+'-question.png'))
    import numpy as np
    a=np.asarray(crop)
    mask=(cv2.cvtColor(a,cv2.COLOR_RGB2GRAY)<170).astype('uint8')
    mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,np.ones((3,3),dtype='uint8'))
    count,lab,stats,centroids=cv2.connectedComponentsWithStats(mask)
    boxes=[]
    for x,y,w,h,area in stats[1:]:
        if w>230 and h>110 and h<crop.height-5 and y>15: boxes.append([int(x),int(y),int(x+w),int(y+h)])
    if boxes:
        x0=max(0,min(b[0] for b in boxes)-8);y0=max(0,min(b[1] for b in boxes)-5)
        x1=min(crop.width,max(b[2] for b in boxes)+8);y1=min(crop.height,max(b[3] for b in boxes)+5)
        if id in {'cogr_d21_q1','cogr_d27_q9','cogr_d28_q11','cogr_d31_q9','cogr_d30_q5'}:
            x0=55; x1=crop.width-10
            y0=max(0,y0-35); y1=min(crop.height,y1+65)
        if id=='cogr_d7_q3': y1+=55
        if id=='cogr_d19_q3': y1+=35
        if id=='cogr_d27_q5': y0=max(0,y0-30)
        if id=='cogr_d13_q3': y0=max(0,y0-18)
        if id=='cogr_d19_q3': y1-=18
        if id=='cogr_d21_q1': y0+=25; y1-=35
        if id=='cogr_d28_q11': y0+=25; y1-=40
        if id=='cogr_d31_q9': y0+=30; y1-=25
        if id=='cogr_d30_q5': y0+=10; y1-=60
        if id=='cogr_d27_q9': y1+=30
        found[id]={'page':c['page'],'side':c['side'],'rect':[x0,y0+max(0,c['y']-8),x1,y1+max(0,c['y']-8)]}
        crop.crop((x0,y0,x1,y1)).save(OUT/(id+'.png'))
(ROOT/'scripts/cografya-review/figures-auto.json').write_text(json.dumps(found,indent=2)+'\n')
items=list(found)
for start in range(0,len(items),8):
    canvas=Image.new('RGB',(1100,1120),'white')
    for j,id in enumerate(items[start:start+8]):
        im=Image.open(OUT/(id+'.png')); im.thumbnail((530,245))
        x=j%2*550;y=j//2*280
        canvas.paste(im,(x,y+25));ImageDraw.Draw(canvas).text((x+5,y+3),id,fill='black')
    canvas.save(OUT/f'contact-{start//8}.jpg')
print('figures',len(found))
