import mongoose, { Document, Model, Schema } from 'mongoose';

interface IActivationDocument extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'registration' | 'email_change' | 'password_reset';
    code: string;
    activationToken: string;
    email: string;
    expiresAt: Date;
    lastResendAt: Date;
    gender?: string;
    data: any;
}

export interface IActivation {
    userId: mongoose.Types.ObjectId;
    type: 'registration' | 'email_change' | 'password_reset';
    code: string;
    activationToken: string;
    email: string;
    expiresAt: Date;
    lastResendAt: Date;
    gender?: string;
    data: any;
}

const activationSchema = new Schema<IActivationDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['registration', 'email_change', 'password_reset']
    },
    code: {
        type: String,
        required: true
    },
    activationToken: {
        type: String,
        required: function (this: IActivationDocument) {
            return this.type === 'registration';
        }
    },
    email: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    lastResendAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    data: {
        type: Schema.Types.Mixed,
        default: {}
    }
});

const Activation = mongoose.model<IActivationDocument>('Activation', activationSchema);
export default Activation; 