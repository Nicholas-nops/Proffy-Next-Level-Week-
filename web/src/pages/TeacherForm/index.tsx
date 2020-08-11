import React, { useState, FormEvent } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

function TeacherForm() {

  const history = useHistory();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }])



  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('cadastro realizado com sucesso!')

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro')
    })

  }

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      ({
        week_day: 0,
        from: '',
        to: ''
      })
    ]);

  }
  function setScheduleItemValue(position: number,field: string, value: string){
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if(index === position){
          return {...scheduleItem, [field]: value};
        }

        return scheduleItem;
      });

      setScheduleItems(updatedScheduleItems);

  }
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="It's awesome you want to teach!."
        description="First, fill this form of scription"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your data</legend>

            <Input name="name" label="Full name" value={name}
              onChange={(e) => {
                setName(e.target.value)
              }} />
            <Input name="Avatar" label="Avatar" value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value)
              }} />
            <Input name="whatsapp" label="Whatsapp" value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value)
              }} />
            <Textarea name="bio" label="Biography" value={bio}
              onChange={(e) => {
                setBio(e.target.value)
              }} />
          </fieldset>
          <fieldset>
            <legend>About the class</legend>
            <Select
              name="subject"
              label="Subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Ed. física', label: 'Ed. física' },
                { value: 'Português', label: 'Português' },
                { value: 'Filosofia', label: 'Filosofia' },
                { value: 'Química', label: 'Química' }

              ]}
            />
            <Input name="costPerClass" label="Cost per class" value={cost}
              onChange={(e) => { setCost(e.target.value) }} />
          </fieldset>
          <fieldset>
            <legend>
              Avaliable hours
            <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Day of week"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    
                    options={[
                      { value: '0', label: 'Sunday' },
                      { value: '1', label: 'Monday' },
                      { value: '2', label: 'Tuesday' },
                      { value: '3', label: 'Wednesdey' },
                      { value: '4', label: 'Thurdsay' },
                      { value: '5', label: 'Friday' },
                      { value: '6', label: 'Saturday' },
                    ]}
                  />
                  <Input name="from" label="Of" type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                  <Input name="to" label="To" type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                </div>
              )
            })}

          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados!
          </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>


    </div>
  );
}

export default TeacherForm;
