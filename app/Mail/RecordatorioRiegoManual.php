<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecordatorioRiegoManual extends Mailable
{
    use Queueable, SerializesModels;

    public $nombrePlanta;

    public function __construct($nombrePlanta)
    {
        $this->nombrePlanta = $nombrePlanta;
    }

    public function build()
    {
        return $this->subject('Recordatorio de riego para tu planta')
                    ->view('emails.recordatorio-riego-manual')
                    ->with(['nombrePlanta' => $this->nombrePlanta]);
    }
}
