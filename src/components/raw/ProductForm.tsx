import * as React from 'react';
import Button from "../ui/Button";

interface IProductFormProps {
    isCreateForm: boolean;
    initialValues?: IProductFormState;
    onSubmit: (name: string, price: number) => void;
    ownerName: string;
}

export interface IProductFormState {
    name: string
    price: number;
}

const DEFAULT_STATE: IProductFormState = {
    name: '',
    price: 0
};

export default class ProductForm extends React.Component<IProductFormProps, IProductFormState> {

    public constructor(props: any | IProductFormProps) {
        super(props);

        if(props.initialValues)
            this.state = props.initialValues;
        else
            this.state = DEFAULT_STATE;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    public render() {
        const title = this.props.isCreateForm ? 'Agregar Producto' : 'Editar Producto';
        return (
            <section>
                <h4>
                    <small>{title}</small>
                </h4>
                {this.props.children}
                <form className="form-inline">
                    {this.props.isCreateForm ? <small>Comprado por: {this.props.ownerName}</small> : ''}
                    <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder="Nombre..."
                            value={this.state.name} onChange={this.handleInputChange}/>
                        <div className="input-group">
                            <input type="text" name="price" className="form-control" placeholder="Precio..."
                                value={this.state.price.toString()} onChange={this.handleInputChange}/>
                            <div className="input-group-addon">$</div>
                        </div>

                        <Button text={this.props.isCreateForm ? 'Agregar' : 'Guardar'} onClick={this.handleButtonClick} icon="glyphicon-plus"/>

                    </div>
                </form>
            </section>
        );
    }

    private handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        if(event.currentTarget.name === "price") {
            const price = parseFloat(event.currentTarget.value);
            this.setState({price: price})
        }
        else {
            this.setState({name: event.currentTarget.value});
        }
    }

    private handleButtonClick() {
        this.props.onSubmit(this.state.name, this.state.price);
        this.setState(DEFAULT_STATE);
    }
}