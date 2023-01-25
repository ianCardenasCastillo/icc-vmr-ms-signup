import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusTenantAvailable } from '../enums/tenant.enum';
import { SignupUtils } from '../utils/signup.utils';

export type TenantDocument = HydratedDocument<Tenant>;
@Schema({
  autoIndex: true,
  toJSON: { transform: omitSensitive },
})
export class Tenant {
  // Datetime management
  @Prop({
    type: Date,
    required: false,
  })
  createdAt: Date;
  @Prop({
    type: Date,
    required: false,
  })
  updatedAt: Date;
  @Prop({
    type: Date,
    required: false,
  })
  lastLogin: Date;

  // Status management
  @Prop({
    type: String,
    required: false,
    default: 'active',
    enum: StatusTenantAvailable,
  })
  status: StatusTenantAvailable;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
    trim: true,
  })
  email: string;
  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  tenantId: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  domain: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

TenantSchema.index({ email: 1 }, { unique: true, name: 'emailUniqueKey' });

TenantSchema.queue('setDefaultProperties', []);
TenantSchema.methods.setDefaultProperties = function () {
  this.createdAt = new Date();
  this.updatedAt = new Date();
  this.tenantId = this._id.toString();
  this.domain = this.email.split('@')[1];
};

function omitSensitive(_doc, obj) {
  delete obj.password;
  return obj;
}
