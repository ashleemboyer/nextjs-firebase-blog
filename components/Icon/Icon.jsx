import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

const Icon = ({ name, small, large, spin }) => {
  let cx = classNames.bind(styles);
  let className = cx('Icon', {
    'Icon--small': !!small,
    'Icon--large': !!large,
  });

  return (
    <FontAwesomeIcon className={className} icon={name || 'smile'} spin={spin} />
  );
};

export default Icon;
