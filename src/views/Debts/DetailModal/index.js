import React from 'react';

import DefaultButton from 'components/Button/Default';
import Modal from 'components/Modal';
import Status from 'components/Status';

import './style.scss';

const DetailModal = ({ setToggle }) => {
  return (
    <Modal setToggle={setToggle} title='Debt details' cancel clickOutSide>
      <div className='detail-modal'>
        <div className='detail-row'>
          <span className='title'>Lender:</span>
          <p>John Doe/5648 3909 7890 2421/EIGHT.Bank</p>
        </div>
        <div className='detail-row'>
          <span className='title'>Debtor:</span>
          <p>Mary Lambert/7758 2332 24109 8579/EIGHT.Bank</p>
        </div>
        <div className='detail-row'>
          <span className='title'>Amount:</span>
          <span>5 000 000 VND</span>
        </div>
        <div className='detail-row'>
          <span className='title'>Description:</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
            lectus gravida dui tristique consequat. Suspendisse id orci eget
            odio ultricies venenatis ultricies et diam. Vestibulum purus ante,
            convallis tristique ultricies vel, ullamcorper non lacus. Duis dolor
            augue, sollicitudin vitae nunc consectetur, euismod malesuada metus.
            Nam sed arcu dui. Mauris tellus elit, interdum ac accumsan vitae,
            laoreet ut lorem. Cras et congue ipsum. Nullam quis quam elit.
          </p>
        </div>
        <div className='detail-row'>
          <span className='title'>Status:</span>
          <Status canceled />
        </div>
        <div className='detail-col'>
          <span>Reason of removal:</span>
          <p>
            Nulla eu neque sit amet nisi maximus ultricies ac id lorem. Morbi
            vitae eleifend nibh. Vestibulum a volutpat ligula, sit amet maximus
            erat. Sed quis consequat tortor, ac luctus purus. Sed metus tortor,
            facilisis ac hendrerit vel, imperdiet sed dolor. Nulla sollicitudin,
            ligula vitae sagittis hendrerit, dolor elit faucibus justo, in
            fringilla est est in metus. Pellentesque sapien nulla, blandit ut
            consequat nec, finibus vel nulla. Phasellus id enim mi. Proin
            consectetur neque dapibus massa convallis, ac pulvinar mauris
            imperdiet. Vestibulum scelerisque at sapien in venenatis. Phasellus
            posuere blandit felis sit amet laoreet. Proin in posuere ante. Nulla
            eu neque sit amet nisi maximus ultricies ac id lorem. Morbi vitae
            eleifend nibh. Vestibulum a volutpat ligula, sit amet maximus erat.
            Sed quis consequat tortor, ac luctus purus. Sed metus tortor,
            facilisis ac hendrerit vel, imperdiet sed dolor. Nulla sollicitudin,
            ligula vitae sagittis hendrerit, dolor elit faucibus justo, in
            fringilla est est in metus. Pellentesque sapien nulla, blandit ut
            consequat nec, finibus vel nulla. Phasellus id enim mi. Proin
            consectetur neque dapibus massa convallis, ac pulvinar mauris
            imperdiet. Vestibulum scelerisque at sapien in venenatis. Phasellus
            posuere blandit felis sit amet laoreet. Proin in posuere ante.
          </p>
        </div>
        <DefaultButton danger>OK</DefaultButton>
      </div>
    </Modal>
  );
};

export default DetailModal;
