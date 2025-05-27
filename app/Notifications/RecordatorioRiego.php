<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class RecordatorioRiego extends Notification
{
    use Queueable;

    public function __construct(public $nombrePlanta)
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('¡Recordatorio de riego!')
            ->greeting('Hola 🌱')
            ->line("Has activado recordatorios para tu planta '{$this->nombrePlanta}'.")
            ->line('¡No olvides regarla pronto!')
            ->salutation('🌸 El equipo de Plantanauta');
    }
}
