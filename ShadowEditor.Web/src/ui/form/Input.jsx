import './css/Input.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 输入框
 * @author tengge / https://github.com/tengge1
 */
class Input extends React.Component {
    constructor(props) {
        super(props);

        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    render() {
        const { className, style, name, type, value, min, max, step, show, disabled } = this.props;

        let val = value === undefined || value === null ? '' : value;

        return <input
            className={classNames('Input', !show && 'hidden', className)}
            style={style}
            type={type}
            value={val}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            autoComplete={'new-password'}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onInput={this.handleInput}
        />;
    }

    handleFocus(event) {
        const { onFocus } = this.props;
        onFocus && onFocus(event);
    }

    handleChange(event) {
        const { name, type, onChange } = this.props;

        const value = event.target.value;

        if (type === 'number') {
            if (value.trim() !== '') {
                const precision = this.props.precision;

                if (precision === 0) {
                    onChange && onChange(parseInt(value), name, event);
                } else {
                    onChange && onChange(parseInt(parseFloat(value) * 10 ** precision) / 10 ** precision, name, event);
                }
            } else {
                onChange && onChange(null, name, event);
            }
        } else {
            onChange && onChange(value, name, event);
        }
    }

    handleInput(event) {
        const { name, type, onInput } = this.props;

        const value = event.target.value;
        if (type === 'number') {
            if (value.trim() !== '') {
                onInput && onInput(parseFloat(value), name, event);
            } else {
                onInput && onInput(null, name, event);
            }
        } else {
            onInput && onInput(value, name, event);
        }
    }
}

Input.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'color', 'password']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    precision: PropTypes.number,
    disabled: PropTypes.bool,
    show: PropTypes.bool,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onInput: PropTypes.func
};

Input.defaultProps = {
    className: null,
    style: null,
    name: null,
    type: 'text',
    value: '',
    min: null,
    max: null,
    step: null,
    precision: 3,
    disabled: false,
    show: true,
    onFocus: null,
    onChange: null,
    onInput: null
};

export default Input;