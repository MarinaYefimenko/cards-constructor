function cards():void {
    class MenuItem {
        src:string;
        alt:string;
        subtitle:string;
        descr:string;
        price:number;
        rate: number;
        parent:HTMLElement | null;

        constructor(src:string, alt:string, subtitle:string, descr:string,
        price:number, parentSelector:string) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.rate = 37;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }
        changeToUAH():void {
            this.price *= this.rate;
        }
        render():void {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            </div>`;

            if (this.parent === null) {
            throw new Error('Could not find parent element.')
            }

            this.parent.append(div);
        }
    }

    const getResource = async (url:string):Promise<Array<{
        img:string;
        altimg:string;
        title:string;
        descr:string;
        price:number
        }>> => {

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getResource ('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
        });
    })
};

export default cards;
